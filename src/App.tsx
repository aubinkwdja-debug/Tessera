/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Home, 
  BookOpen, 
  Heart, 
  Settings, 
  Info, 
  ChevronRight, 
  ChevronLeft,
  Search, 
  Moon, 
  Sun, 
  Plus, 
  Minus,
  ArrowLeft,
  Cross,
  Book,
  Flag,
  Share2,
  ExternalLink,
  ShieldCheck,
  Calendar,
  Bell,
  Globe,
  User,
  Volume2,
  Play,
  Square,
  Loader2,
  CheckCircle2,
  Mail,
  Facebook,
  Twitter,
  Instagram
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { PRAYERS, ROSARY, TESSERA_CONTENT, LITURGICAL_CALENDAR, VEXILLUM_INFO, MASS_FLOW, type Prayer, type LiturgicalEvent } from './data';
import { t, type Language } from './i18n';
import { GoogleGenAI, Modality } from "@google/genai";
import { TesseraPage } from './components/TesseraPage';
import { auth, googleProvider, db, syncUserSettings, removeFavorite, addFavorite, type FirebaseUser } from './firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, query, onSnapshot, doc, getDoc } from 'firebase/firestore';

declare var process: any;

// --- Components ---

let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is required');
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

const base64ToAudioBlob = (base64: string, sampleRate: number = 24000) => {
  const byteCharacters = atob(base64);
  const pcmData = new Uint8Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    pcmData[i] = byteCharacters.charCodeAt(i);
  }

  // Check if it already has a RIFF header (WAV)
  if (pcmData[0] === 0x52 && pcmData[1] === 0x49 && pcmData[2] === 0x46 && pcmData[3] === 0x46) {
    return new Blob([pcmData], { type: 'audio/wav' });
  }
  // Check if it's MP3 (ID3 or sync word)
  if ((pcmData[0] === 0x49 && pcmData[1] === 0x44 && pcmData[2] === 0x33) || (pcmData[0] === 0xFF && (pcmData[1] & 0xE0) === 0xE0)) {
    return new Blob([pcmData], { type: 'audio/mp3' });
  }

  // Otherwise, assume raw PCM (L16) and add WAV header
  const header = new ArrayBuffer(44);
  const view = new DataView(header);

  // RIFF identifier
  view.setUint32(0, 0x52494646, false); // "RIFF"
  // file length
  view.setUint32(4, 36 + pcmData.length, true);
  // WAVE identifier
  view.setUint32(8, 0x57415645, false); // "WAVE"
  // fmt chunk identifier
  view.setUint32(12, 0x666d7420, false); // "fmt "
  // format chunk length
  view.setUint32(16, 16, true);
  // sample format (1 = PCM)
  view.setUint16(20, 1, true);
  // channel count (1 = mono)
  view.setUint16(22, 1, true);
  // sample rate
  view.setUint32(24, sampleRate, true);
  // byte rate (sample rate * block align)
  view.setUint32(28, sampleRate * 2, true);
  // block align (channel count * bytes per sample)
  view.setUint16(32, 2, true);
  // bits per sample
  view.setUint16(34, 16, true);
  // data chunk identifier
  view.setUint32(36, 0x64617461, false); // "data"
  // data chunk length
  view.setUint32(40, pcmData.length, true);

  const wav = new Uint8Array(44 + pcmData.length);
  wav.set(new Uint8Array(header), 0);
  wav.set(pcmData, 44);
  
  return new Blob([wav], { type: 'audio/wav' });
};

const Header = ({ onOpenMenu, isDarkMode, isMarianMode, language }: { onOpenMenu: () => void; isDarkMode: boolean; isMarianMode: boolean; language: Language }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Tessera - Légion de Marie',
          text: 'Découvrez l\'application Tessera pour la Légion de Marie.',
          url: window.location.origin,
        });
      } catch (error) {
        console.log('Share cancelled or failed');
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.origin);
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }
  };

  return (
    <header className={cn(
      "sticky top-0 z-40 w-full backdrop-blur-xl border-b transition-colors duration-300",
      isDarkMode 
        ? (isMarianMode ? "bg-[#0a1128]/80 border-blue-900 text-blue-50" : "bg-gray-900/80 border-gray-800 text-white") 
        : (isMarianMode ? "bg-[#f0f4f8]/80 border-blue-200 text-[#0a1128]" : "bg-[#fdfcf8]/80 border-amber-100/50 text-[#1a237e]")
    )}>
      <div className="flex h-16 items-center justify-between px-4 max-w-md mx-auto">
        <div className="flex items-center gap-3">
          {!isHome ? (
            <button onClick={() => navigate(-1)} className={cn("p-2 -ml-2 rounded-full transition-all active:scale-90", isDarkMode ? "hover:bg-gray-800 text-amber-400" : "hover:bg-amber-50 text-[#1a237e]")}>
              <ArrowLeft size={20} strokeWidth={1.5} />
            </button>
          ) : (
            <button onClick={onOpenMenu} className={cn("p-2 -ml-2 rounded-full transition-all active:scale-90", isDarkMode ? "hover:bg-gray-800 text-amber-400" : "hover:bg-amber-50 text-[#1a237e]")}>
              <Menu size={20} strokeWidth={1.5} />
            </button>
          )}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg shadow-blue-900/20 overflow-hidden border border-amber-400/30 p-1">
              <img 
                src="https://png.pngtree.com/png-vector/20241231/ourlarge/pngtree-virgin-mary-in-red-cloak-with-sacred-symbol-png-image_14839357.png" 
                alt="Légion de Marie Logo" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="text-[#1a237e] font-sans italic text-xl">M</div>';
                }}
              />
            </div>
            <div className="flex flex-col -space-y-1">
              <h1 className={cn("text-lg font-sans font-black tracking-tighter uppercase", isDarkMode ? "text-white" : "text-[#1a237e]")}>Tessera</h1>
              <span className="text-[6px] font-black text-amber-600 uppercase tracking-[0.4em]">Legio Mariae</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={handleShare}
            className={cn("p-2 rounded-full transition-all active:scale-90", isDarkMode ? "hover:bg-gray-800 text-amber-400" : "hover:bg-amber-50 text-[#1a237e]")}
          >
            <Share2 size={20} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </header>
  );
};

const Drawer = ({ isOpen, onClose, isDarkMode, isMarianMode, language }: { isOpen: boolean; onClose: () => void; isDarkMode: boolean; isMarianMode: boolean; language: Language }) => {
  const location = useLocation();
  const menuItems = [
    { icon: Home, label: t[language].home, path: '/', category: 'Principal' },
    { icon: Heart, label: 'Mes Favoris', path: '/prayers/favoris', category: 'Principal' },
    { icon: Calendar, label: 'Calendrier', path: '/calendar', category: 'Principal' },
    { icon: Book, label: 'Déroulement Messe', path: '/mass', category: 'Principal' },
    { icon: BookOpen, label: 'Credo', path: '/prayers/credo', category: 'Prières' },
    { icon: Cross, label: t[language].rosary, path: '/rosary', category: 'Prières' },
    { icon: BookOpen, label: 'Tessera', path: '/tessera', category: 'Légion' },
    { icon: BookOpen, label: 'Autres Prières', path: '/prayers/autre', category: 'Prières' },
    ...(isMarianMode ? [{ icon: Heart, label: t[language].marianPrayers, path: '/prayers/marian', category: 'Prières' }] : []),
    { icon: Settings, label: t[language].settings, path: '/settings', category: 'App' },
    { icon: Info, label: t[language].about, path: '/about', category: 'App' },
  ];

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={cn(
                "fixed inset-y-0 left-0 z-[101] w-72 shadow-2xl overflow-hidden border-r transition-colors duration-300",
                isDarkMode 
                  ? (isMarianMode ? "bg-[#0a1128] border-blue-900" : "bg-gray-900 border-gray-800") 
                  : (isMarianMode ? "bg-[#f0f4f8] border-blue-200" : "bg-[#fdfcf8] border-amber-100")
              )}
            >
              <div className="flex flex-col h-full">
                {/* Compact Header - Logo on Left */}
                <div className={cn("relative p-4 text-white overflow-hidden", isMarianMode ? "bg-blue-800" : "bg-[#1a237e]")}>
                  <div className="absolute inset-0 opacity-10">
                    <img 
                      src="https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=60&w=400&auto=format&fit=crop" 
                      alt="Marie fond de menu" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                  </div>
                  <div className="relative z-10 flex items-center gap-3">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-lg border border-amber-400/30 shrink-0 p-1">
                      <img 
                        src="https://png.pngtree.com/png-vector/20241231/ourlarge/pngtree-virgin-mary-in-red-cloak-with-sacred-symbol-png-image_14839357.png" 
                        alt="Légion de Marie Logo" 
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                          (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="text-[#1a237e] font-sans italic text-xl">M</div>';
                        }}
                      />
                    </div>
                    <div className="flex flex-col">
                      <h2 className="text-base font-sans italic font-bold leading-tight">Légion de Marie</h2>
                      <p className="text-amber-400 text-[5px] font-black capitalize tracking-[0.3em] opacity-80">Concilium Legionis</p>
                    </div>
                    <button 
                      onClick={onClose}
                      className="ml-auto p-1.5 hover:bg-white/10 rounded-full transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>

                {/* Drawer Navigation */}
                <nav className="flex-1 overflow-y-auto py-2">
                  {Array.from(new Set(menuItems.map(item => item.category))).map((category) => (
                    <div key={category} className="mb-2">
                      <div className={cn(
                        "px-6 py-2 text-[10px] font-black tracking-[0.2em] capitalize opacity-40",
                        isDarkMode ? "text-blue-200" : (isMarianMode ? "text-blue-900" : "text-[#1a237e]")
                      )}>
                        {category}
                      </div>
                      <div className={cn("grid grid-cols-1", isDarkMode ? (isMarianMode ? "divide-blue-900/30" : "divide-gray-800/30") : (isMarianMode ? "divide-blue-100/50" : "divide-amber-50/50"))}>
                        {menuItems.filter(item => item.category === category).map((item) => {
                          const isActive = location.pathname === item.path;
                          return (
                            <Link
                              key={item.path}
                              to={item.path}
                              onClick={onClose}
                              className={cn(
                                "flex items-center justify-between px-6 py-4 transition-all group",
                                isActive 
                                  ? (isDarkMode 
                                      ? (isMarianMode ? "bg-blue-900/30 text-blue-400 font-bold" : "bg-gray-800 text-amber-400 font-bold") 
                                      : (isMarianMode ? "bg-blue-100 text-blue-900 font-bold" : "bg-amber-50 text-[#1a237e] font-bold"))
                                  : (isDarkMode 
                                      ? (isMarianMode ? "text-blue-200 hover:bg-blue-900/50" : "text-gray-400 hover:bg-gray-800/50") 
                                      : (isMarianMode ? "text-blue-800 hover:bg-blue-50" : "text-gray-600 hover:bg-gray-50"))
                              )}
                            >
                              <div className="flex items-center gap-4">
                                <item.icon size={18} strokeWidth={isActive ? 2.5 : 1.5} className={cn(isActive ? (isMarianMode ? "text-blue-500" : "text-amber-600") : (isDarkMode ? (isMarianMode ? "text-blue-400" : "text-gray-600") : (isMarianMode ? "text-blue-400" : "text-gray-400")))} />
                                <span className="text-sm font-bold tracking-tight capitalize">{item.label}</span>
                              </div>
                              {isActive && (
                                <div className={cn("w-1.5 h-1.5 rounded-full", isMarianMode ? "bg-blue-500" : "bg-amber-600")} />
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </nav>

                {/* Drawer Footer */}
                <div className={cn("p-6 border-t text-center", isDarkMode ? (isMarianMode ? "border-blue-900 bg-[#0a1128]/50" : "border-gray-800 bg-gray-900/50") : (isMarianMode ? "border-blue-200 bg-[#f0f4f8]/50" : "border-amber-100 bg-white/50"))}>
                  <div className={cn("text-[9px] font-black capitalize tracking-[0.3em] mb-1", isDarkMode ? (isMarianMode ? "text-blue-400" : "text-amber-400") : (isMarianMode ? "text-blue-800" : "text-[#1a237e]"))}>
                    Tessera Digital
                  </div>
                  <div className="text-[7px] font-black text-gray-400 capitalize tracking-[0.2em]">
                    v1.0.0 • Spiritus Sanctus
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const GestureHandler = ({ children, onOpenMenu }: { children: ReactNode; onOpenMenu: () => void }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <motion.div
      className="flex-1 flex flex-col min-h-screen"
      onPanEnd={(_, info) => {
        // Swipe from left to right (x > 0)
        // Check if distance is significant and velocity is enough
        if (info.offset.x > 80 && info.velocity.x > 100) {
          const startX = info.point.x - info.offset.x;
          // Only trigger if swipe started near the left edge
          if (startX < 60) {
            if (isHome) {
              onOpenMenu();
            } else {
              navigate(-1);
            }
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};

// --- Pages ---

const HomePage = ({ isDarkMode, isMarianMode, language }: { isDarkMode: boolean; isMarianMode: boolean; language: Language }) => {
  const [dailyReading, setDailyReading] = useState('');
  const [isLoadingReading, setIsLoadingReading] = useState(true);
  const [heroQuote, setHeroQuote] = useState('');

  useEffect(() => {
    const quotes = [
      "Prier le Rosaire, c'est contempler le visage du Christ avec Marie",
      "Marie est le chemin le plus court pour aller à Jésus",
      "La Légion de Marie est une armée en marche sous la bannière de la Vierge",
      "La sainteté consiste à faire la volonté de Dieu avec le sourire",
      "Marie ne nous laisse jamais seuls dans nos épreuves",
      "Par Marie, tout devient plus facile, plus doux et plus lumineux",
      "Le Rosaire est la chaîne qui nous lie à Dieu par Marie",
      "Servir Marie, c'est régner avec Jésus"
    ];
    setHeroQuote(quotes[Math.floor(Math.random() * quotes.length)]);

    const fetchDailyReading = async () => {
      const today = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
      const cachedReading = localStorage.getItem('dailyReading');
      const cachedDate = localStorage.getItem('dailyReadingDate');

      if (cachedReading && cachedDate === today) {
        setDailyReading(cachedReading);
        setIsLoadingReading(false);
        return;
      }

      try {
        const ai = getAiClient();
        const prompt = `Trouve les références exactes des lectures bibliques pour la messe du jour catholique (Date : ${today}).
        Donne : 
        1. La 1ère Lecture (référence + titre court)
        2. Le Psaume (référence + antienne)
        3. L'Évangile (référence + titre court)
        Format court et élégant pour affichage mobile. Ne donne que le texte des lectures, sans introduction.`;

        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: prompt,
          config: {
            tools: [{ googleSearch: {} }]
          }
        });
        
        const result = response.text?.trim() || "Lectures non disponibles.";
        setDailyReading(result);
        localStorage.setItem('dailyReading', result);
        localStorage.setItem('dailyReadingDate', today);
      } catch (error) {
        setDailyReading("Lectures non disponibles.");
      } finally {
        setIsLoadingReading(false);
      }
    };

    fetchDailyReading();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn("pb-20 transition-colors duration-300", isDarkMode ? (isMarianMode ? "bg-[#0a1128]" : "bg-gray-900") : (isMarianMode ? "bg-[#f0f4f8]" : "bg-[#fdfcf8]"))}
    >
      {/* Hero Section */}
      <section className={cn("relative min-h-[12rem] py-6 flex flex-col justify-center items-center p-6 text-center overflow-hidden", isMarianMode ? "bg-blue-800" : "bg-[#1a237e]")}>
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=1200&auto=format&fit=crop" 
            alt="Vierge Marie" 
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
            fetchPriority="high"
          />
          <div className={cn("absolute inset-0 bg-gradient-to-b", isMarianMode ? "from-blue-800/40 via-blue-800/80 to-blue-800" : "from-[#1a237e]/40 via-[#1a237e]/80 to-[#1a237e]")} />
        </div>
        
        <div className="relative z-10 w-full max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-lg p-1">
                <img 
                  src="https://png.pngtree.com/png-vector/20241231/ourlarge/pngtree-virgin-mary-in-red-cloak-with-sacred-symbol-png-image_14839357.png" 
                  alt="Légion de Marie Logo" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className={cn("text-[9px] font-bold uppercase tracking-[0.4em]", isMarianMode ? "text-blue-200" : "text-amber-400")}>Legio Mariae</p>
            </div>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl font-serif font-bold text-white leading-tight mb-4 whitespace-nowrap">
              À Jésus <span className={cn("italic", isMarianMode ? "text-blue-200" : "text-amber-400")}>par Marie</span>
            </h2>
            <div className={cn("w-48 h-[1px] mx-auto mb-4", isMarianMode ? "bg-blue-200/50" : "bg-amber-400/50")} />
            <p className="text-blue-50 text-sm sm:text-lg font-serif italic leading-relaxed opacity-90 px-4 max-w-sm mx-auto">
              "{heroQuote}"
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-6"
          >
            <Link
              to="/prayers/autre"
              className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 hover:bg-white/20 text-blue-50 rounded-full text-xs font-medium transition-colors border border-white/20 backdrop-blur-sm"
            >
              <Heart size={14} className={isMarianMode ? "text-blue-200" : "text-amber-400"} />
              <span>Découvrir mes Prières</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Mission Section - Full Width Style */}
      <div className="px-4 mt-8 space-y-8">
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={cn(
            "p-8 rounded-[2.5rem] relative overflow-hidden shadow-sm border transition-colors duration-300",
            isDarkMode 
              ? (isMarianMode ? "bg-[#0a1128] border-blue-900" : "bg-gray-800 border-gray-700") 
              : (isMarianMode ? "bg-white border-blue-100" : "bg-white border-amber-50")
          )}
        >
          <div className="absolute top-0 right-0 p-8 opacity-[0.05] pointer-events-none select-none">
            <span className={cn("text-[15rem] font-serif font-black leading-none", isDarkMode ? "text-white" : (isMarianMode ? "text-blue-900" : "text-[#1a237e]"))}>M</span>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-5 mb-8">
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center", isDarkMode ? (isMarianMode ? "bg-blue-900/50 text-blue-400" : "bg-gray-700 text-amber-400") : (isMarianMode ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"))}>
                <Book size={28} />
              </div>
              <div>
                <p className={cn("text-[10px] font-black uppercase tracking-[0.5em] mb-1", isDarkMode ? (isMarianMode ? "text-blue-400" : "text-amber-400") : (isMarianMode ? "text-blue-600" : "text-amber-600"))}>Notre Mission</p>
                <h3 className={cn("text-3xl font-serif font-bold tracking-tight", isDarkMode ? "text-white" : (isMarianMode ? "text-blue-900" : "text-[#1a237e]"))}>Histoire & Esprit</h3>
              </div>
            </div>
            <p className={cn("leading-relaxed text-base pl-6 border-l-2", isDarkMode ? "text-gray-300" : "text-gray-600", isMarianMode ? "border-blue-400/40" : "border-amber-400/40")}>
              La Légion de Marie est une association de catholiques qui, sous la puissante direction de Marie Immaculée, Médiatrice de toutes les grâces, se sont formés en une armée pour servir dans la guerre perpétuelle que l'Église mène contre le monde et ses puissances maléfiques.
            </p>
          </div>
        </motion.section>

        {/* Daily Reading Section - Replaces Founder Quote as requested */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className={cn("text-white p-8 rounded-[2.5rem] relative overflow-hidden group", isMarianMode ? "bg-blue-800 shadow-xl shadow-blue-500/20" : "bg-[#1a237e] shadow-xl shadow-blue-900/20")}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-2xl" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", isMarianMode ? "bg-blue-200" : "bg-amber-400")}>
                <Book size={14} className={cn(isMarianMode ? "text-blue-800" : "text-[#1a237e]")} />
              </div>
              <h3 className={cn("text-[10px] font-bold tracking-[0.3em] uppercase", isMarianMode ? "text-blue-200" : "text-amber-400")}>Lecture du jour</h3>
            </div>
            
            {isLoadingReading ? (
              <div className="flex flex-col gap-4 py-8 items-center text-center">
                <Loader2 className="w-8 h-8 animate-spin opacity-50" />
                <p className="text-sm italic opacity-70">Recherche des lectures de la Messe...</p>
              </div>
            ) : (
              <div className="space-y-6">
                <p className="text-lg font-serif italic leading-relaxed text-blue-50 whitespace-pre-line border-l-2 border-white/20 pl-6">
                  {dailyReading}
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", isMarianMode ? "bg-blue-200" : "bg-amber-400")}>
                    <Calendar size={14} className={cn(isMarianMode ? "text-blue-800" : "text-[#1a237e]")} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest opacity-80">
                    {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                  </span>
                </div>
              </div>
            )}
          </div>
        </motion.section>

        {/* Côte d'Ivoire Section */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={cn(
            "p-8 rounded-[2.5rem] relative overflow-hidden shadow-sm border transition-colors duration-300",
            isDarkMode 
              ? (isMarianMode ? "bg-blue-900/20 border-blue-800" : "bg-emerald-900/20 border-emerald-800") 
              : (isMarianMode ? "bg-white border-blue-100" : "bg-white border-emerald-100")
          )}
        >
          <div className="absolute top-0 right-0 p-8 opacity-[0.05] pointer-events-none select-none">
            <span className={cn("text-[15rem] font-serif font-black leading-none", isDarkMode ? "text-white" : (isMarianMode ? "text-blue-900" : "text-emerald-900"))}>CI</span>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-5 mb-6">
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center", isDarkMode ? (isMarianMode ? "bg-blue-800/50 text-blue-400" : "bg-emerald-800/50 text-emerald-400") : (isMarianMode ? "bg-blue-50 text-blue-600" : "bg-emerald-50 text-emerald-600"))}>
                <Globe size={28} />
              </div>
              <div>
                <p className={cn("text-[10px] font-black uppercase tracking-[0.5em] mb-1", isDarkMode ? (isMarianMode ? "text-blue-400" : "text-emerald-400") : (isMarianMode ? "text-blue-600" : "text-emerald-600"))}>Notre Pays</p>
                <h3 className={cn("text-3xl font-serif font-bold tracking-tight", isDarkMode ? "text-white" : (isMarianMode ? "text-blue-900" : "text-emerald-900"))}>Côte d'Ivoire</h3>
              </div>
            </div>
            <p className={cn("leading-relaxed text-base mb-6", isDarkMode ? "text-gray-300" : "text-gray-600")}>
              Prions pour notre nation, sous la protection de Notre-Dame de la Paix, patronne de la Côte d'Ivoire.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <Link 
                to="/prayer/priere-paix-ci"
                className={cn("p-4 rounded-2xl text-sm font-bold flex items-center justify-between group transition-all", isDarkMode ? (isMarianMode ? "bg-blue-800/40 text-blue-400 border border-blue-700 hover:bg-blue-800/60" : "bg-emerald-800/40 text-emerald-400 border border-emerald-700 hover:bg-emerald-800/60") : (isMarianMode ? "bg-white text-blue-900 border border-blue-100 hover:bg-blue-50" : "bg-white text-emerald-900 border border-emerald-100 hover:bg-emerald-50"))}
              >
                <span>Paix en CI</span>
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/prayer/nd-paix-yamoussoukro"
                className={cn("p-4 rounded-2xl text-sm font-bold flex items-center justify-between group transition-all", isDarkMode ? (isMarianMode ? "bg-blue-800/40 text-blue-400 border border-blue-700 hover:bg-blue-800/60" : "bg-emerald-800/40 text-emerald-400 border border-emerald-700 hover:bg-emerald-800/60") : (isMarianMode ? "bg-white text-blue-900 border border-blue-100 hover:bg-blue-50" : "bg-white text-emerald-900 border border-emerald-100 hover:bg-emerald-50"))}
              >
                <span>ND de la Paix</span>
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

const PrayersListPage = ({ isDarkMode, isMarianMode, user }: { isDarkMode: boolean; isMarianMode: boolean; user: FirebaseUser | null }) => {
  const { category } = useParams<{ category: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      const q = query(collection(db, 'users', user.uid, 'favorites'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setFavoriteIds(snapshot.docs.map(doc => doc.id));
      });
      return () => unsubscribe();
    } else {
      setFavoriteIds(JSON.parse(localStorage.getItem('favorites') || '[]'));
    }
  }, [user]);
  
  const allPrayersInCategory = category === 'favoris'
    ? PRAYERS.filter(p => favoriteIds.includes(p.id))
    : PRAYERS.filter(p => p.category === category || category === 'all');

  const prayers = allPrayersInCategory.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const title = category === 'credo' ? 'Le Credo' : category === 'legion' ? 'La Tessera' : category === 'favoris' ? 'Mes Favoris' : 'Autres Prières';
  
  // Grouping logic for 'autre' category
  const legionPrayers = prayers.filter(p => p.id.includes('legion') || p.id === 'magnificat');
  const gospelPrayers = prayers.filter(p => p.id.startsWith('evangile-'));
  const ciPrayers = prayers.filter(p => p.id === 'priere-paix-ci' || p.id === 'nd-paix-yamoussoukro');
  
  // Fetch marian prayers from all PRAYERS to include 'je-vous-salue-marie'
  const allMarianPrayers = PRAYERS.filter(p => ['je-vous-salue-marie', 'salve-regina', 'souvenez-vous', 'magnificat', 'angelus'].includes(p.id));
  const marianPrayers = allMarianPrayers.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));
  
  const otherPrayers = prayers.filter(p => !p.id.includes('legion') && p.id !== 'magnificat' && !p.id.startsWith('evangile-') && p.id !== 'priere-paix-ci' && p.id !== 'nd-paix-yamoussoukro' && !allMarianPrayers.some(mp => mp.id === p.id));

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className={cn("p-6 space-y-8 pb-24 transition-colors duration-300", isDarkMode ? (isMarianMode ? "bg-[#0a1128]" : "bg-gray-900") : (isMarianMode ? "bg-[#f0f4f8]" : "bg-[#fdfcf8]"))}
    >
      <div className="px-2 flex justify-between items-end">
        <div>
          <p className={cn("text-[10px] font-black uppercase tracking-[0.3em] mb-2 opacity-60", isMarianMode ? "text-blue-700" : "text-amber-700")}>Recueil de prières</p>
          <h2 className={cn("text-4xl font-serif italic font-bold capitalize tracking-tight", isDarkMode ? "text-white" : (isMarianMode ? "text-blue-900" : "text-[#1a237e]"))}>
            {title}
          </h2>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-0">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={18} className={cn("transition-colors", isMarianMode ? "text-blue-400 group-focus-within:text-blue-600" : "text-gray-400 group-focus-within:text-amber-600")} />
          </div>
          <input
            type="text"
            placeholder="Rechercher une prière..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn(
              "w-full rounded-2xl py-2.5 pl-11 pr-10 text-sm font-medium focus:outline-none focus:ring-4 transition-all",
              isDarkMode 
                ? (isMarianMode ? "bg-blue-900/30 text-white placeholder-blue-300 focus:ring-blue-500/20" : "bg-gray-800 text-white placeholder-gray-500 focus:ring-amber-400/10") 
                : (isMarianMode ? "bg-white text-blue-900 focus:ring-blue-200/50" : "bg-white text-gray-900 focus:ring-amber-400/10")
            )}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className={cn("absolute inset-y-0 right-0 pr-4 flex items-center", isMarianMode ? "text-blue-400 hover:text-blue-600" : "text-gray-400 hover:text-amber-600")}
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>
      
      {prayers.length === 0 ? (
        <div className="text-center py-20">
          <div className={cn("w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6", isDarkMode ? "bg-gray-800" : "bg-gray-50")}>
            <Search size={40} className={cn(isDarkMode ? "text-gray-600" : "text-gray-200")} />
          </div>
          <p className={cn("font-sans italic text-lg", isDarkMode ? "text-gray-500" : "text-gray-400")}>Aucune prière trouvée</p>
        </div>
      ) : category === 'autre' ? (
        <div className="space-y-10">
          {isMarianMode && marianPrayers.length > 0 && (
            <div className="space-y-5">
              <div className="px-2 flex items-center gap-4">
                <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center shadow-sm", isDarkMode ? "bg-blue-900 text-blue-400" : "bg-blue-50 text-blue-600")}>
                  <Heart size={22} />
                </div>
                <h3 className={cn("text-xl font-sans font-bold", isDarkMode ? "text-white" : "text-blue-900")}>
                  Prières Mariales
                </h3>
              </div>
              <div className="space-y-4">
                {marianPrayers.map(prayer => (
                  <Link 
                    key={prayer.id} 
                    to={`/prayer/${prayer.id}`}
                    className={cn(
                      "group block p-6 rounded-[2rem] flex justify-between items-center transition-all active:scale-[0.98]",
                      isDarkMode 
                        ? "bg-blue-900/20 hover:bg-blue-900/40" 
                        : "bg-white hover:bg-blue-50"
                    )}
                  >
                    <span className={cn("font-serif font-bold text-lg italic", isDarkMode ? "text-blue-300" : "text-blue-800")}>{prayer.title}</span>
                    <div className={cn("w-10 h-10 rounded-full flex items-center justify-center transition-all", isDarkMode ? "bg-blue-800 group-hover:bg-blue-700" : "bg-blue-50 group-hover:bg-blue-100")}>
                      <ChevronRight size={22} className={cn(isDarkMode ? "text-blue-400 group-hover:text-blue-200" : "text-blue-300 group-hover:text-blue-600")} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Legion prayers section removed */}


          {gospelPrayers.length > 0 && (
            <div className="space-y-4">
              <div className="px-2 flex items-center gap-3">
                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", isDarkMode ? "bg-emerald-900/30 text-emerald-400" : "bg-emerald-50 text-emerald-600")}>
                  <Book size={18} />
                </div>
                <h3 className={cn("text-lg font-sans font-bold", isDarkMode ? "text-white" : (isMarianMode ? "text-blue-900" : "text-[#1a237e]"))}>
                  Les Évangiles
                </h3>
              </div>
              <div className="space-y-3">
                {gospelPrayers.map(prayer => (
                  <Link 
                    key={prayer.id} 
                    to={`/prayer/${prayer.id}`}
                    className={cn(
                      "group block p-5 rounded-2xl shadow-sm border flex justify-between items-center transition-all",
                      isDarkMode 
                        ? "bg-gray-800 border-gray-700 hover:border-emerald-500/50" 
                        : (isMarianMode ? "bg-white border-blue-100 hover:border-blue-300" : "bg-white border-[#e8e4d8] hover:border-amber-200")
                    )}
                  >
                    <span className={cn("font-sans font-bold text-lg", isDarkMode ? "text-gray-200" : (isMarianMode ? "text-blue-900" : "text-[#1a237e]"))}>{prayer.title}</span>
                    <ChevronRight size={20} className={cn("transition-colors", isDarkMode ? "text-gray-500 group-hover:text-emerald-400" : (isMarianMode ? "text-blue-200 group-hover:text-blue-600" : "text-gray-300 group-hover:text-amber-600"))} />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {ciPrayers.length > 0 && (
            <div className="space-y-5">
              <div className="px-2 flex items-center gap-4">
                <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center shadow-sm", isDarkMode ? (isMarianMode ? "bg-blue-900 text-blue-400" : "bg-emerald-900 text-emerald-400") : (isMarianMode ? "bg-blue-50 text-blue-600" : "bg-emerald-50 text-emerald-600"))}>
                  <Globe size={22} />
                </div>
                <h3 className={cn("text-xl font-sans font-bold", isDarkMode ? "text-white" : (isMarianMode ? "text-blue-900" : "text-emerald-900"))}>
                  Côte d'Ivoire
                </h3>
              </div>
              <div className="space-y-4">
                {ciPrayers.map(prayer => (
                  <Link 
                    key={prayer.id} 
                    to={`/prayer/${prayer.id}`}
                    className={cn(
                      "group block p-6 rounded-[2rem] flex justify-between items-center transition-all active:scale-[0.98]",
                      isDarkMode 
                        ? (isMarianMode ? "bg-blue-900/20 hover:bg-blue-900/40" : "bg-gray-800 hover:bg-gray-700") 
                        : (isMarianMode ? "bg-white hover:bg-blue-50" : "bg-white hover:bg-emerald-50")
                    )}
                  >
                    <span className={cn("font-serif font-bold text-lg italic", isDarkMode ? (isMarianMode ? "text-blue-300" : "text-emerald-400") : (isMarianMode ? "text-blue-800" : "text-emerald-900"))}>{prayer.title}</span>
                    <div className={cn("w-10 h-10 rounded-full flex items-center justify-center transition-all", isDarkMode ? (isMarianMode ? "bg-blue-800 group-hover:bg-blue-700" : "bg-gray-700 group-hover:bg-gray-600") : (isMarianMode ? "bg-blue-50 group-hover:bg-blue-100" : "bg-gray-50 group-hover:bg-emerald-50"))}>
                      <ChevronRight size={22} className={cn(isDarkMode ? (isMarianMode ? "text-blue-400 group-hover:text-blue-200" : "text-gray-500 group-hover:text-emerald-400") : (isMarianMode ? "text-blue-300 group-hover:text-blue-600" : "text-gray-300 group-hover:text-emerald-600"))} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {otherPrayers.length > 0 && (
            <div className="space-y-4">
              <div className="px-2 flex items-center gap-3">
                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", isDarkMode ? (isMarianMode ? "bg-blue-900/30 text-blue-400" : "bg-amber-900/30 text-amber-400") : (isMarianMode ? "bg-blue-50 text-blue-800" : "bg-amber-50 text-amber-800"))}>
                  <Heart size={18} />
                </div>
                <h3 className={cn("text-lg font-sans font-bold", isDarkMode ? "text-white" : (isMarianMode ? "text-blue-900" : "text-[#1a237e]"))}>
                  Autres Prières
                </h3>
              </div>
              <div className="space-y-3">
                {otherPrayers.map(prayer => (
                  <Link 
                    key={prayer.id} 
                    to={`/prayer/${prayer.id}`}
                    className={cn(
                      "group block p-5 rounded-2xl shadow-sm border flex justify-between items-center transition-all",
                      isDarkMode 
                        ? (isMarianMode ? "bg-gray-800 border-gray-700 hover:border-blue-500/50" : "bg-gray-800 border-gray-700 hover:border-amber-500/50") 
                        : (isMarianMode ? "bg-white border-blue-100 hover:border-blue-300" : "bg-white border-[#e8e4d8] hover:border-amber-200")
                    )}
                  >
                    <span className={cn("font-sans font-bold text-lg", isDarkMode ? "text-gray-200" : (isMarianMode ? "text-blue-900" : "text-[#1a237e]"))}>{prayer.title}</span>
                    <ChevronRight size={20} className={cn("transition-colors", isDarkMode ? (isMarianMode ? "text-gray-500 group-hover:text-blue-400" : "text-gray-500 group-hover:text-amber-400") : (isMarianMode ? "text-blue-200 group-hover:text-blue-600" : "text-gray-300 group-hover:text-amber-600"))} />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {prayers.map(prayer => (
            <Link 
              key={prayer.id} 
              to={`/prayer/${prayer.id}`}
              className={cn(
                "group block p-5 rounded-2xl shadow-sm border flex justify-between items-center transition-all",
                isDarkMode 
                  ? (isMarianMode ? "bg-gray-800 border-gray-700 hover:border-blue-500/50" : "bg-gray-800 border-gray-700 hover:border-amber-500/50") 
                  : (isMarianMode ? "bg-white border-blue-100 hover:border-blue-300" : "bg-white border-[#e8e4d8] hover:border-amber-200")
              )}
            >
              <span className={cn("font-sans font-bold text-lg", isDarkMode ? "text-gray-200" : (isMarianMode ? "text-blue-900" : "text-[#1a237e]"))}>{prayer.title}</span>
              <ChevronRight size={20} className={cn("transition-colors", isDarkMode ? (isMarianMode ? "text-gray-500 group-hover:text-blue-400" : "text-gray-500 group-hover:text-amber-400") : (isMarianMode ? "text-blue-200 group-hover:text-blue-600" : "text-gray-300 group-hover:text-amber-600"))} />
            </Link>
          ))}
        </div>
      )}
    </motion.div>
  );
};

const PrayerDetailPage = ({ isDarkMode, isMarianMode, user }: { isDarkMode: boolean; isMarianMode: boolean; user: FirebaseUser | null }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const prayer = PRAYERS.find(p => p.id === id);
  const [fontSize, setFontSize] = useState(18);
  const [isFavorite, setIsFavorite] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | undefined>(prayer?.audioUrl);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      if (user) {
        // Subscribe to favorites from Firestore
        const favoriteRef = doc(db, 'users', user.uid, 'favorites', id);
        const unsubscribe = onSnapshot(favoriteRef, (docSnap) => {
          setIsFavorite(docSnap.exists());
        });
        return () => unsubscribe();
      } else {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setIsFavorite(favorites.includes(id));
      }
    }
  }, [id, user]);

  const toggleFavorite = async () => {
    if (!id) return;
    
    if (user) {
      if (isFavorite) {
        await removeFavorite(user.uid, id);
      } else {
        await addFavorite(user.uid, id);
      }
    } else {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      let newFavorites;
      if (isFavorite) {
        newFavorites = favorites.filter((f: string) => f !== id);
      } else {
        newFavorites = [...favorites, id];
      }
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      setIsFavorite(!isFavorite);
    }
  };

  const generateAudio = async () => {
    if (!prayer || isGenerating) return;
    setIsGenerating(true);
    setError(null);
    const voice = localStorage.getItem('voice') || 'Zephyr';
    try {
      const response = await getAiClient().models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: prayer.content }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: voice as any },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        const audioBlob = base64ToAudioBlob(base64Audio);
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        
        // Try to auto-play
        setTimeout(() => {
          const audioElement = document.getElementById('prayer-audio') as HTMLAudioElement;
          if (audioElement) {
            audioElement.play().catch(e => console.error("Auto-play failed:", e));
          }
        }, 100);
      } else {
        setError("Erreur : Aucun audio généré.");
      }
    } catch (error) {
      console.error("Audio generation failed:", error);
      setError("Erreur lors de la génération de l'audio. Veuillez réessayer.");
    } finally {
      setIsGenerating(false);
    }
  };

  if (!prayer) return <div className="p-10 text-center font-sans italic text-gray-400">Prière non trouvée</div>;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn("p-6 space-y-8 pb-32 transition-colors duration-300", isDarkMode ? (isMarianMode ? "bg-[#0a1128]" : "bg-gray-900") : (isMarianMode ? "bg-[#f0f4f8]" : "bg-[#fdfcf8]"))}
    >
      <div className="flex justify-between items-center px-2">
        <div className="flex items-center gap-4 flex-1 pr-4">
          <button 
            onClick={() => navigate(-1)}
            className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl border active:scale-90 transition-all", isDarkMode ? (isMarianMode ? "bg-blue-900 border-blue-800" : "bg-gray-800 border-gray-700") : (isMarianMode ? "bg-white border-blue-50" : "bg-white border-gray-50"))}
          >
            <ChevronLeft size={24} className={cn(isDarkMode ? "text-white" : (isMarianMode ? "text-blue-900" : "text-[#1a237e]"))} />
          </button>
          <div className="flex-1">
            <p className={cn("text-[10px] font-black uppercase tracking-[0.3em] mb-1 opacity-60", isMarianMode ? "text-blue-700" : "text-amber-700")}>{prayer.category}</p>
            <h2 className={cn("text-xl font-serif italic font-bold leading-tight tracking-tight", isDarkMode ? "text-white" : (isMarianMode ? "text-blue-900" : "text-[#1a237e]"))}>{prayer.title}</h2>
          </div>
        </div>
        <button 
          onClick={toggleFavorite}
          className={cn(
            "w-14 h-14 rounded-[1.25rem] transition-all shadow-xl flex items-center justify-center border-2", 
            isFavorite 
              ? (isDarkMode ? (isMarianMode ? "text-blue-400 bg-blue-900/40 border-blue-700 shadow-blue-900/20" : "text-amber-400 bg-amber-900/40 border-amber-700 shadow-amber-900/20") : (isMarianMode ? "text-blue-600 bg-blue-50 border-blue-200 shadow-blue-200/20" : "text-amber-600 bg-amber-50 border-amber-200 shadow-amber-200/20")) 
              : (isDarkMode ? (isMarianMode ? "text-gray-500 bg-gray-800 border-gray-700 shadow-gray-900/20 hover:border-blue-500" : "text-gray-500 bg-gray-800 border-gray-700 shadow-gray-900/20 hover:border-amber-500") : (isMarianMode ? "text-gray-300 bg-white border-blue-100 shadow-blue-200/20 hover:border-blue-200" : "text-gray-300 bg-white border-gray-100 shadow-gray-200/20 hover:border-amber-200"))
          )}
        >
          <Flag size={24} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>

      <div className={cn(
        "p-10 rounded-[3rem] min-h-[60vh] relative overflow-hidden transition-colors duration-300",
        isDarkMode ? (isMarianMode ? "bg-blue-900/20" : "bg-gray-800") : "bg-white"
      )}>
        <div className={cn("absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r", isMarianMode ? "from-blue-200 via-blue-400 to-blue-200" : "from-amber-200 via-amber-400 to-amber-200")} />
        
        {prayer.imageUrl && (
          <div className={cn("mb-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-4", isDarkMode ? (isMarianMode ? "border-blue-800 bg-blue-900" : "border-gray-700 bg-gray-900") : (isMarianMode ? "border-blue-100 bg-blue-50" : "border-white bg-gray-100"))}>
            <img 
              src={prayer.imageUrl} 
              alt={prayer.title} 
              className="w-full h-auto object-cover"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          </div>
        )}
        
        <div className="mb-10">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm text-center font-medium">
              {error}
            </div>
          )}
          {audioUrl ? (
            <div className={cn("p-6 rounded-[2rem] border shadow-inner", isDarkMode ? (isMarianMode ? "bg-blue-900/50 border-blue-800" : "bg-gray-900 border-gray-700") : (isMarianMode ? "bg-blue-50 border-blue-100" : "bg-amber-50 border-amber-100"))}>
              <audio key={audioUrl} id="prayer-audio" controls src={audioUrl} className="w-full h-10" />
            </div>
          ) : (
            <button 
              onClick={generateAudio}
              disabled={isGenerating}
              className={cn("w-full py-5 text-white rounded-[2rem] font-bold flex items-center justify-center gap-4 active:scale-95 transition-all shadow-xl disabled:opacity-50", isMarianMode ? "bg-blue-600 hover:bg-blue-700 shadow-blue-600/20" : "bg-[#1a237e] hover:bg-[#283593] shadow-blue-900/20")}
            >
              {isGenerating ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                  <span className="text-lg">Génération...</span>
                </div>
              ) : (
                <>
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                    <Plus size={22} />
                  </div>
                  <span className="text-lg">Écouter la prière</span>
                </>
              )}
            </button>
          )}
        </div>

        <p 
          className={cn("leading-[1.8] whitespace-pre-line font-serif italic text-center", isDarkMode ? (isMarianMode ? "text-blue-100" : "text-gray-200") : (isMarianMode ? "text-blue-900" : "text-gray-800"))}
          style={{ fontSize: `${fontSize}px` }}
        >
          {prayer.content}
        </p>
      </div>

      {/* Font Size Controls - Smaller and more discreet */}
      <div className="fixed bottom-28 right-4 flex flex-col gap-2 z-40">
        <div className={cn(
          "backdrop-blur-xl p-1.5 rounded-[1.5rem] shadow-2xl border flex flex-col gap-1.5",
          isDarkMode ? (isMarianMode ? "bg-blue-900/90 border-blue-800" : "bg-gray-800/90 border-gray-700") : (isMarianMode ? "bg-white/90 border-blue-100/50" : "bg-white/90 border-amber-100/50")
        )}>
          <button 
            onClick={() => setFontSize(s => Math.min(s + 2, 36))}
            className={cn("w-10 h-10 text-white rounded-xl shadow-lg flex items-center justify-center active:scale-90 transition-all", isMarianMode ? "bg-blue-600" : "bg-[#1a237e]")}
            aria-label="Augmenter la taille du texte"
          >
            <Plus size={18} />
          </button>
          <div className={cn("h-6 flex items-center justify-center font-black text-[10px]", isDarkMode ? (isMarianMode ? "text-blue-300" : "text-amber-400") : (isMarianMode ? "text-blue-800" : "text-[#1a237e]"))}>
            {fontSize}
          </div>
          <button 
            onClick={() => setFontSize(s => Math.max(s - 2, 14))}
            className={cn(
              "w-10 h-10 rounded-xl shadow-lg border flex items-center justify-center active:scale-90 transition-all",
              isDarkMode ? (isMarianMode ? "bg-blue-800 text-blue-300 border-blue-700" : "bg-gray-700 text-amber-400 border-gray-600") : (isMarianMode ? "bg-white text-blue-800 border-blue-100" : "bg-white text-[#1a237e] border-gray-100")
            )}
            aria-label="Diminuer la taille du texte"
          >
            <Minus size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const RosaryPage = ({ isDarkMode, isMarianMode }: { isDarkMode: boolean; isMarianMode: boolean }) => {
  const daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  
  const getCurrentDay = () => {
    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    return days[new Date().getDay()];
  };

  const currentDayReal = getCurrentDay();
  const [selectedDay, setSelectedDay] = useState(currentDayReal);
  const [selectedCategory, setSelectedCategory] = useState(() => {
    return ROSARY.find(cat => cat.days.includes(currentDayReal)) || ROSARY[0];
  });
  const [completedMysteries, setCompletedMysteries] = useState<string[]>([]);
  const [activeMysteryIndex, setActiveMysteryIndex] = useState<number | null>(null);

  const handleDaySelect = (day: string) => {
    setSelectedDay(day);
    const category = ROSARY.find(cat => cat.days.includes(day));
    if (category) {
      setSelectedCategory(category);
      setCompletedMysteries([]); // Reset progress when changing day
      setActiveMysteryIndex(null);
    }
  };

  const toggleMystery = (title: string) => {
    setCompletedMysteries(prev => 
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };

  const nextMystery = () => {
    if (activeMysteryIndex !== null && activeMysteryIndex < selectedCategory.mysteries.length - 1) {
      setActiveMysteryIndex(activeMysteryIndex + 1);
    }
  };

  const prevMystery = () => {
    if (activeMysteryIndex !== null && activeMysteryIndex > 0) {
      setActiveMysteryIndex(activeMysteryIndex - 1);
    }
  };

  const progress = (completedMysteries.length / selectedCategory.mysteries.length) * 100;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className={cn("p-3 space-y-6 pb-32 relative transition-colors duration-300", isDarkMode ? (isMarianMode ? "bg-[#0a1128]" : "bg-gray-900") : (isMarianMode ? "bg-[#f0f4f8]" : "bg-[#fdfcf8]"))}
    >
      {/* Progress Bar */}
      <div className={cn("fixed top-20 left-0 w-full h-1.5 z-30", isDarkMode ? "bg-gray-800" : "bg-gray-100")}>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className={cn("h-full shadow-[0_0_10px_rgba(251,191,36,0.5)]", isMarianMode ? "bg-blue-400" : "bg-amber-400")}
        />
      </div>

      <div className="flex justify-between items-center px-1 pt-4">
        <div>
          <h2 className={cn("text-3xl font-serif italic font-black tracking-tighter leading-none", isDarkMode ? "text-white" : (isMarianMode ? "text-blue-900" : "text-[#1a237e]"))}>Rosaire</h2>
          <p className={cn("font-serif italic text-lg opacity-80", isMarianMode ? "text-blue-700" : "text-amber-700")}>Méditation des mystères</p>
        </div>
        <div className={cn("px-4 py-2 rounded-2xl border shadow-sm text-center", isDarkMode ? (isMarianMode ? "bg-blue-900 border-blue-800" : "bg-gray-800 border-gray-700") : (isMarianMode ? "bg-white border-blue-100" : "bg-white border-amber-100"))}>
          <span className={cn("text-[10px] font-black uppercase tracking-widest", isDarkMode ? (isMarianMode ? "text-blue-300" : "text-amber-400") : (isMarianMode ? "text-blue-800" : "text-[#1a237e]"))}>{currentDayReal}</span>
        </div>
      </div>
      
      {/* Day Selector - Pills */}
      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide px-2">
        {daysOfWeek.map(day => {
          const isToday = day === currentDayReal;
          const isSelected = selectedDay === day;
          
          return (
            <motion.button
              key={day}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleDaySelect(day)}
              className={cn(
                "px-6 py-3 rounded-2xl whitespace-nowrap font-black transition-all text-[10px] uppercase tracking-[0.2em] border",
                isSelected 
                  ? (isMarianMode ? "bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-900/20" : "bg-[#1a237e] text-white border-[#1a237e] shadow-xl shadow-blue-900/20") 
                  : isToday
                    ? (isDarkMode ? (isMarianMode ? "bg-blue-900/30 text-blue-400 border-blue-800" : "bg-amber-900/30 text-amber-400 border-amber-800") : (isMarianMode ? "bg-blue-50 text-blue-900 border-blue-200" : "bg-amber-50 text-amber-900 border-amber-200"))
                    : (isDarkMode ? "bg-gray-800 text-gray-400 border-gray-700" : "bg-white text-gray-400 border-gray-100")
              )}
            >
              {day}
            </motion.button>
          );
        })}
      </div>

      {/* Category Selection - Compact Grid */}
      {activeMysteryIndex === null && (
        <div className="grid grid-cols-2 gap-4">
          {ROSARY.map(cat => (
            <motion.button
              key={cat.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSelectedCategory(cat);
                setSelectedDay(cat.days[0]);
                setCompletedMysteries([]); // Reset progress
                setActiveMysteryIndex(null);
              }}
              className={cn(
                "p-5 rounded-[2.5rem] text-left transition-all border flex flex-col justify-center h-24 relative overflow-hidden shadow-sm",
                selectedCategory.id === cat.id 
                  ? (isMarianMode ? "bg-blue-400 text-white border-blue-500 shadow-xl shadow-blue-400/20" : "bg-amber-400 text-[#1a237e] border-amber-500 shadow-xl shadow-amber-400/20") 
                  : (isDarkMode ? (isMarianMode ? "bg-blue-900/20 text-blue-300 border-blue-800" : "bg-gray-800 text-gray-400 border-gray-700") : (isMarianMode ? "bg-white text-blue-500 border-blue-100" : "bg-white text-gray-500 border-gray-100"))
              )}
            >
              <h4 className="font-serif font-black text-sm uppercase tracking-tight leading-tight">{cat.title}</h4>
              <span className={cn(
                "text-[9px] font-black uppercase tracking-widest mt-2 opacity-70",
                selectedCategory.id === cat.id ? (isMarianMode ? "text-blue-100" : "text-[#1a237e]") : "text-gray-400"
              )}>
                {cat.days.join(', ')}
              </span>
            </motion.button>
          ))}
        </div>
      )}

      {/* Mysteries List - Timeline Style */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeMysteryIndex !== null ? `mystery-${activeMysteryIndex}` : selectedCategory.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8 pt-4"
        >
          {activeMysteryIndex === null ? (
            <>
              <div className={cn("px-6 py-6 rounded-[2.5rem] border shadow-xl text-center", isDarkMode ? "bg-gray-800 border-gray-700 shadow-none" : (isMarianMode ? "bg-white border-blue-50 shadow-blue-200/30" : "bg-white border-gray-50 shadow-gray-200/30"))}>
                <p className={cn("text-lg leading-relaxed italic font-serif opacity-90", isDarkMode ? "text-gray-300" : (isMarianMode ? "text-blue-800" : "text-gray-600"))}>
                  "{selectedCategory.description}"
                </p>
              </div>

              <div className="space-y-10 relative">
                {selectedCategory.mysteries.map((mystery, idx) => {
                  const isCompleted = completedMysteries.includes(mystery.title);
                  
                  return (
                    <motion.div
                      key={mystery.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.08 }}
                      className="relative"
                      onClick={() => setActiveMysteryIndex(idx)}
                    >
                      <div className={cn(
                        "p-6 rounded-[2.5rem] transition-all cursor-pointer group",
                        isCompleted 
                          ? (isDarkMode ? (isMarianMode ? "bg-blue-900/20" : "bg-amber-900/20") : (isMarianMode ? "bg-blue-50" : "bg-amber-50")) 
                          : (isDarkMode ? "bg-gray-800" : "bg-white")
                      )}>
                        <div className="flex items-center justify-between gap-4 mb-4">
                          <h3 className={cn("font-serif font-bold text-2xl leading-tight tracking-tight", isDarkMode ? "text-white" : (isMarianMode ? "text-blue-900" : "text-[#1a237e]"))}>{mystery.title}</h3>
                          {isCompleted && (
                            <div className={cn("w-8 h-8 rounded-full flex items-center justify-center shadow-lg", isMarianMode ? "bg-blue-400 text-white shadow-blue-400/20" : "bg-amber-400 text-[#1a237e] shadow-amber-400/20")}>
                              <CheckCircle2 size={18} strokeWidth={3} />
                            </div>
                          )}
                        </div>
                        
                        <p className={cn("text-lg leading-relaxed font-medium italic opacity-90 border-l-2 pl-6 line-clamp-2", isDarkMode ? "text-gray-300" : (isMarianMode ? "text-blue-800" : "text-gray-600"), isMarianMode ? "border-blue-400/30" : "border-amber-400/30")}>
                          {mystery.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="space-y-8">
              <button 
                onClick={() => setActiveMysteryIndex(null)}
                className={cn("flex items-center gap-2 text-sm font-black uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity", isDarkMode ? "text-white" : "text-[#1a237e]")}
              >
                <ArrowLeft size={16} />
                Retour à la liste
              </button>

              {(() => {
                const mystery = selectedCategory.mysteries[activeMysteryIndex];
                const isCompleted = completedMysteries.includes(mystery.title);
                
                return (
                  <div className={cn(
                    "p-8 rounded-[3rem] transition-all border shadow-2xl",
                    isDarkMode ? "bg-gray-800 border-gray-700" : (isMarianMode ? "bg-white border-blue-50 shadow-blue-200/20" : "bg-white border-amber-50 shadow-amber-200/20")
                  )}>
                    <div className="flex items-center justify-between gap-4 mb-8">
                      <div className="space-y-1">
                        <p className={cn("text-[10px] font-black uppercase tracking-[0.3em] opacity-60", isMarianMode ? "text-blue-600" : "text-amber-600")}>Mystère {activeMysteryIndex + 1} sur 5</p>
                        <h3 className={cn("font-serif font-bold text-3xl leading-tight tracking-tight", isDarkMode ? "text-white" : (isMarianMode ? "text-blue-900" : "text-[#1a237e]"))}>{mystery.title}</h3>
                      </div>
                      <button 
                        onClick={() => toggleMystery(mystery.title)}
                        className={cn(
                          "w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-lg",
                          isCompleted 
                            ? (isMarianMode ? "bg-blue-400 text-white shadow-blue-400/30" : "bg-amber-400 text-[#1a237e] shadow-amber-400/30")
                            : (isDarkMode ? "bg-gray-700 text-gray-400" : "bg-gray-100 text-gray-400")
                        )}
                      >
                        <CheckCircle2 size={24} strokeWidth={2.5} />
                      </button>
                    </div>
                    
                    <p className={cn("text-xl leading-relaxed font-medium italic opacity-90 border-l-4 pl-8 mb-10", isDarkMode ? "text-gray-300" : (isMarianMode ? "text-blue-800" : "text-gray-600"), isMarianMode ? "border-blue-400/30" : "border-amber-400/30")}>
                      {mystery.description}
                    </p>

                    {mystery.scripture && (
                      <div className={cn("flex items-start gap-6 mb-10 p-8 rounded-3xl border", isDarkMode ? "bg-gray-900/50 border-gray-700" : (isMarianMode ? "bg-blue-50/50 border-blue-100/50" : "bg-gray-50/50 border-gray-100/50"))}>
                        <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 mt-1", isMarianMode ? "bg-blue-100" : "bg-blue-50")}>
                          <Book size={20} className={cn(isMarianMode ? "text-blue-800" : "text-blue-700")} />
                        </div>
                        <p className={cn("font-serif italic text-xl leading-relaxed", isDarkMode ? "text-blue-300/80" : "text-blue-900/80")}>
                          {mystery.scripture}
                        </p>
                      </div>
                    )}
                    
                    <div className={cn("flex items-center gap-6 pt-8 border-t", isDarkMode ? "border-gray-700" : (isMarianMode ? "border-blue-100" : "border-gray-100"))}>
                      <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center shrink-0", isMarianMode ? "bg-blue-100" : "bg-amber-100")}>
                        <Flag size={20} className={cn(isMarianMode ? "text-blue-700" : "text-amber-700")} fill="currentColor" />
                      </div>
                      <div>
                        <p className={cn("font-black text-[10px] uppercase tracking-[0.2em] opacity-60 mb-1", isMarianMode ? "text-blue-900" : "text-amber-900")}>Fruit du mystère</p>
                        <p className={cn("font-serif font-bold text-xl italic", isDarkMode ? (isMarianMode ? "text-blue-400" : "text-amber-400") : (isMarianMode ? "text-blue-800" : "text-[#1a237e]"))}>
                          {mystery.fruit}
                        </p>
                      </div>
                    </div>

                    {/* Navigation Buttons */}
                      <div className="flex gap-3 mt-10">
                        <button
                          disabled={activeMysteryIndex === 0}
                          onClick={prevMystery}
                          className={cn(
                            "flex-1 py-2 rounded-2xl font-black uppercase tracking-widest text-[9px] flex items-center justify-center gap-2 border transition-all",
                            activeMysteryIndex === 0 
                              ? "opacity-30 cursor-not-allowed" 
                              : (isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-200 text-gray-900 shadow-sm hover:shadow-md")
                          )}
                        >
                          <ChevronLeft size={16} />
                          Précédent
                        </button>
                        <button
                          disabled={activeMysteryIndex === selectedCategory.mysteries.length - 1}
                          onClick={nextMystery}
                          className={cn(
                            "flex-1 py-2 rounded-2xl font-black uppercase tracking-widest text-[9px] flex items-center justify-center gap-2 transition-all shadow-xl",
                            activeMysteryIndex === selectedCategory.mysteries.length - 1
                              ? "opacity-30 cursor-not-allowed"
                              : (isMarianMode ? "bg-blue-600 text-white shadow-blue-600/20" : "bg-[#1a237e] text-white shadow-blue-900/20")
                          )}
                        >
                          Suivant
                          <ChevronRight size={16} />
                        </button>
                      </div>
                  </div>
                );
              })()}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};





const MassFlowPage = ({ isDarkMode, isMarianMode }: { isDarkMode: boolean; isMarianMode: boolean }) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn("p-6 pb-20 space-y-8", isDarkMode ? "bg-gray-900" : (isMarianMode ? "bg-[#f0f4f8]" : "bg-[#fdfcf8]"))}
    >
      <div className="text-center mb-10">
        <h2 className={cn("text-3xl font-serif italic font-bold mb-2", isDarkMode ? "text-white" : (isMarianMode ? "text-blue-900" : "text-[#1a237e]"))}>Déroulement de la Messe</h2>
        <div className={cn("w-20 h-1 mx-auto rounded-full", isMarianMode ? "bg-blue-400" : "bg-amber-400")} />
      </div>

      <div className="space-y-10">
        {MASS_FLOW.map((section, idx) => (
          <div key={section.title} className="space-y-4">
            <h3 className={cn("text-xs font-black uppercase tracking-[0.2em] mb-4 opacity-60 px-2", isMarianMode ? "text-blue-700" : "text-amber-700")}>
              {section.title}
            </h3>
            <div className="space-y-3">
              {section.parts.map((part, pIdx) => {
                const id = `${idx}-${pIdx}`;
                const isExpanded = expandedSection === id;
                
                return (
                  <motion.div
                    key={part.title}
                    layout
                    className={cn(
                      "rounded-[2rem] border transition-all overflow-hidden",
                      isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100 shadow-sm"
                    )}
                  >
                    <button
                      onClick={() => setExpandedSection(isExpanded ? null : id)}
                      className="w-full p-6 flex items-center justify-between gap-4 text-left"
                    >
                      <span className={cn("font-bold text-lg leading-tight", isDarkMode ? "text-gray-200" : (isMarianMode ? "text-blue-900" : "text-[#1a237e]"))}>
                        {part.title}
                      </span>
                      <ChevronRight 
                        size={20} 
                        className={cn("transition-transform duration-300", isExpanded ? "rotate-90" : "", isDarkMode ? "text-gray-500" : "text-gray-300")} 
                      />
                    </button>
                    
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className={cn("px-6 pb-8 space-y-6", isDarkMode ? "text-gray-300" : "text-gray-700")}>
                            {part.details && (
                              <p className="text-sm italic opacity-80 border-l-2 pl-4 py-1 leading-relaxed border-amber-300/30">
                                {part.details}
                              </p>
                            )}
                            
                            {part.dialogue && (
                              <div className="space-y-4">
                                {part.dialogue.map((line, lIdx) => (
                                  <div key={lIdx} className={cn(
                                    "flex flex-col gap-1",
                                    line.isResponse ? "pl-4" : ""
                                  )}>
                                    <span className={cn(
                                      "text-[10px] font-black uppercase tracking-widest",
                                      line.isResponse 
                                        ? (isMarianMode ? "text-blue-500" : "text-amber-600") 
                                        : (isDarkMode ? "text-gray-400" : "text-gray-500")
                                    )}>
                                      {line.speaker} :
                                    </span>
                                    <p className={cn(
                                      "text-base leading-relaxed whitespace-pre-line",
                                      line.isResponse ? "font-bold italic" : ""
                                    )}>
                                      {line.text}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            )}
                            
                            {part.content && (
                              <p className="text-base leading-relaxed whitespace-pre-line font-serif italic text-center p-6 bg-gray-500/5 rounded-3xl">
                                {part.content}
                              </p>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};


const SettingsPage = ({ 
  isDarkMode, 
  setIsDarkMode, 
  notificationsEnabled, 
  setNotificationsEnabled,
  selectedVoice,
  setSelectedVoice,
  language,
  setLanguage,
  isMarianMode,
  setIsMarianMode,
  user
}: { 
  isDarkMode: boolean; 
  setIsDarkMode: (v: boolean) => void;
  notificationsEnabled: boolean;
  setNotificationsEnabled: (v: boolean) => void;
  selectedVoice: string;
  setSelectedVoice: (v: string) => void;
  language: Language;
  setLanguage: (v: Language) => void;
  isMarianMode: boolean;
  setIsMarianMode: (v: boolean) => void;
  user: FirebaseUser | null;
}) => {
  const voices = ['Kore', 'Puck', 'Charon', 'Fenrir', 'Zephyr'];
  const [isPreviewing, setIsPreviewing] = useState<string | null>(null);

  const handleToggleNotifications = async () => {
    if (!notificationsEnabled) {
      if (!('Notification' in window)) {
        alert(t[language].notificationNotSupported);
        return;
      }

      if (Notification.permission === 'denied') {
        alert(t[language].notificationPermissionDenied);
        return;
      }

      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setNotificationsEnabled(true);
        try {
          new Notification(t[language].angelusTime, {
            body: t[language].notificationTestSent,
            icon: "https://png.pngtree.com/png-vector/20241231/ourlarge/pngtree-virgin-mary-in-red-cloak-with-sacred-symbol-png-image_14839357.png"
          });
        } catch (e) {
          console.error("Failed to send test notification:", e);
        }
      } else {
        setNotificationsEnabled(false);
      }
    } else {
      setNotificationsEnabled(false);
    }
  };

  const sendTestNotification = () => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(t[language].angelusTime, {
        body: t[language].notificationTestSent,
        icon: "https://png.pngtree.com/png-vector/20241231/ourlarge/pngtree-virgin-mary-in-red-cloak-with-sacred-symbol-png-image_14839357.png"
      });
    } else {
      handleToggleNotifications();
    }
  };

  const playVoicePreview = async (voice: string) => {
    if (isPreviewing) return;
    setIsPreviewing(voice);
    setSelectedVoice(voice);

    try {
      const response = await getAiClient().models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: t[language].voicePreview }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: voice as any },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        const audioBlob = base64ToAudioBlob(base64Audio);
        const url = URL.createObjectURL(audioBlob);
        const audioElement = document.getElementById('preview-audio') as HTMLAudioElement;
        if (audioElement) {
          audioElement.src = url;
          audioElement.play().catch(e => {
            console.error("Audio play failed:", e);
            setIsPreviewing(null);
          });
        }
      } else {
        setIsPreviewing(null);
      }
    } catch (error) {
      console.error("Voice preview failed:", error);
      setIsPreviewing(null);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("p-6 space-y-8 pb-24 transition-colors duration-300", isDarkMode ? (isMarianMode ? "bg-[#0a1128]" : "bg-gray-900") : (isMarianMode ? "bg-[#f0f4f8]" : "bg-[#fdfcf8]"))}
    >
      <div className="px-2">
        <p className={cn("text-[10px] font-black uppercase tracking-[0.3em] mb-2 opacity-60", isDarkMode ? (isMarianMode ? "text-blue-400" : "text-amber-400") : (isMarianMode ? "text-blue-700" : "text-amber-700"))}>{t[language].preferences}</p>
        <h2 className={cn("text-4xl font-serif italic font-bold tracking-tight", isDarkMode ? "text-white" : (isMarianMode ? "text-blue-900" : "text-[#1a237e]"))}>{t[language].settings}</h2>
      </div>

      {/* Auth Section */}
      <section className="space-y-4">
        <h3 className={cn("px-2 text-sm font-black uppercase tracking-widest", isDarkMode ? "text-gray-400" : (isMarianMode ? "text-blue-800" : "text-gray-500"))}>Compte</h3>
        <div className={cn("rounded-[2.5rem] shadow-sm border overflow-hidden p-6", isDarkMode ? (isMarianMode ? "bg-blue-900/20 border-blue-800" : "bg-gray-800 border-gray-700") : (isMarianMode ? "bg-white border-blue-50" : "bg-white border-amber-50"))}>
          {user ? (
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500 shadow-lg">
                  <img src={user.photoURL || ""} alt={user.displayName || ""} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <p className={cn("font-bold", isDarkMode ? "text-white" : "text-blue-900")}>{user.displayName}</p>
                  <p className="text-[10px] text-gray-500 font-medium tracking-wider">{user.email}</p>
                </div>
              </div>
              <button 
                onClick={() => signOut(auth)}
                className="px-4 py-2 rounded-xl bg-red-500/10 text-red-500 text-xs font-bold hover:bg-red-500/20 transition-all"
              >
                Déconnexion
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="w-16 h-16 rounded-3xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-2">
                <User size={32} />
              </div>
              <div>
                <p className={cn("font-bold text-lg", isDarkMode ? "text-white" : "text-blue-900")}>Synchronisez vos données</p>
                <p className="text-xs text-gray-500 px-4">Connectez-vous pour retrouver vos favoris et vos réglages sur tous vos appareils.</p>
              </div>
              <button 
                onClick={() => signInWithPopup(auth, googleProvider)}
                className="w-full py-4 mt-2 rounded-[1.5rem] bg-blue-600 text-white font-bold flex items-center justify-center gap-3 shadow-lg shadow-blue-600/20 active:scale-95 transition-all"
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
                Se connecter avec Google
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Appearance Section */}
      <section className="space-y-4">
        <h3 className={cn("px-2 text-sm font-black uppercase tracking-widest", isDarkMode ? "text-gray-400" : (isMarianMode ? "text-blue-800" : "text-gray-500"))}>{t[language].appearance}</h3>
        <div className={cn("rounded-[2.5rem] shadow-sm border overflow-hidden", isDarkMode ? (isMarianMode ? "bg-blue-900/20 border-blue-800" : "bg-gray-800 border-gray-700") : (isMarianMode ? "bg-white border-blue-50" : "bg-white border-amber-50"))}>
          <div className={cn("p-6 flex justify-between items-center border-b", isDarkMode ? (isMarianMode ? "border-blue-800" : "border-gray-700") : (isMarianMode ? "border-blue-50" : "border-gray-50"))}>
            <div className="flex items-center gap-4">
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-colors", isDarkMode ? (isMarianMode ? "bg-blue-800 text-blue-300" : "bg-blue-900 text-blue-400") : (isMarianMode ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"))}>
                {isDarkMode ? <Moon size={24} /> : <Sun size={24} />}
              </div>
              <div>
                <span className={cn("font-bold text-lg block", isDarkMode ? "text-white" : (isMarianMode ? "text-blue-900" : "text-gray-900"))}>{t[language].nightMode}</span>
                <span className="text-xs text-gray-400">{t[language].nightModeDesc}</span>
              </div>
            </div>
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={cn("w-14 h-8 rounded-full transition-all relative p-1", isDarkMode ? (isMarianMode ? "bg-blue-600" : "bg-blue-600") : "bg-gray-200")}
            >
              <motion.div 
                animate={{ x: isDarkMode ? 24 : 0 }}
                className="w-6 h-6 bg-white rounded-full shadow-md" 
              />
            </button>
          </div>
          <div className={cn("p-6 flex justify-between items-center", isDarkMode ? (isMarianMode ? "bg-blue-900/20" : "bg-gray-800") : (isMarianMode ? "bg-white" : "bg-white"))}>
            <div className="flex items-center gap-4">
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-colors", isDarkMode ? (isMarianMode ? "bg-blue-800 text-blue-300" : "bg-blue-900 text-blue-400") : (isMarianMode ? "bg-blue-50 text-blue-600" : "bg-blue-50 text-blue-600"))}>
                <Heart size={24} />
              </div>
              <div>
                <span className={cn("font-bold text-lg block", isDarkMode ? "text-white" : (isMarianMode ? "text-blue-900" : "text-gray-900"))}>{t[language].marianMode}</span>
                <span className="text-xs text-gray-400">{t[language].marianModeDesc}</span>
              </div>
            </div>
            <button 
              onClick={() => setIsMarianMode(!isMarianMode)}
              className={cn("w-14 h-8 rounded-full transition-all relative p-1", isMarianMode ? "bg-blue-500" : "bg-gray-200")}
            >
              <motion.div 
                animate={{ x: isMarianMode ? 24 : 0 }}
                className="w-6 h-6 bg-white rounded-full shadow-md" 
              />
            </button>
          </div>
        </div>
      </section>

      {/* Notifications Section */}
      <section className="space-y-4">
        <h3 className={cn("px-2 text-sm font-black uppercase tracking-widest", isDarkMode ? "text-gray-400" : (isMarianMode ? "text-blue-800" : "text-gray-500"))}>{t[language].notifications}</h3>
        <div className={cn("rounded-[2.5rem] shadow-sm border overflow-hidden", isDarkMode ? (isMarianMode ? "bg-blue-900/20 border-blue-800" : "bg-gray-800 border-gray-700") : (isMarianMode ? "bg-white border-blue-50" : "bg-white border-amber-50"))}>
          <div className="p-6 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", isDarkMode ? (isMarianMode ? "bg-blue-800 text-blue-300" : "bg-amber-900/30 text-amber-400") : (isMarianMode ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"))}>
                <Bell size={24} />
              </div>
              <div>
                <span className={cn("font-bold text-lg block", isDarkMode ? "text-white" : (isMarianMode ? "text-blue-900" : "text-gray-900"))}>{t[language].prayerReminders}</span>
                <span className="text-xs text-gray-400">{t[language].prayerRemindersDesc}</span>
              </div>
            </div>
            <button 
              onClick={handleToggleNotifications}
              className={cn("w-14 h-8 rounded-full transition-all relative p-1", notificationsEnabled ? (isMarianMode ? "bg-blue-500" : "bg-amber-500") : "bg-gray-200")}
            >
              <motion.div 
                animate={{ x: notificationsEnabled ? 24 : 0 }}
                className="w-6 h-6 bg-white rounded-full shadow-md" 
              />
            </button>
          </div>
          {notificationsEnabled && (
            <div className="px-6 pb-6">
              <button 
                onClick={sendTestNotification}
                className={cn(
                  "w-full py-3 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2",
                  isDarkMode 
                    ? (isMarianMode ? "bg-blue-800/40 text-blue-300 border border-blue-700" : "bg-amber-900/20 text-amber-400 border border-amber-800/50") 
                    : (isMarianMode ? "bg-blue-50 text-blue-700 border border-blue-100" : "bg-amber-50 text-amber-700 border border-amber-100")
                )}
              >
                <Bell size={16} />
                {t[language].testNotification}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Audio Section */}
      <audio id="preview-audio" className="hidden" onEnded={() => setIsPreviewing(null)} />
      <section className="space-y-4">
        <h3 className={cn("px-2 text-sm font-black uppercase tracking-widest", isDarkMode ? "text-gray-400" : (isMarianMode ? "text-blue-800" : "text-gray-500"))}>{t[language].audioVoice}</h3>
        <div className={cn("rounded-[2.5rem] shadow-sm border overflow-hidden p-6 space-y-6", isDarkMode ? (isMarianMode ? "bg-blue-900/20 border-blue-800" : "bg-gray-800 border-gray-700") : (isMarianMode ? "bg-white border-blue-50" : "bg-white border-amber-50"))}>
          <div className="flex items-center gap-4 mb-2">
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", isDarkMode ? (isMarianMode ? "bg-blue-800 text-blue-300" : "bg-blue-900/30 text-blue-400") : (isMarianMode ? "bg-blue-50 text-blue-600" : "bg-blue-50 text-blue-600"))}>
              <Volume2 size={24} />
            </div>
            <div>
              <span className={cn("font-bold text-lg block", isDarkMode ? "text-white" : (isMarianMode ? "text-blue-900" : "text-gray-900"))}>{t[language].readingVoice}</span>
              <span className="text-xs text-gray-400">{t[language].readingVoiceDesc}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {voices.map(voice => (
              <button
                key={voice}
                onClick={() => playVoicePreview(voice)}
                disabled={isPreviewing !== null}
                className={cn(
                  "py-3 px-4 rounded-2xl text-sm font-bold transition-all border flex items-center justify-center gap-2",
                  selectedVoice === voice 
                    ? (isMarianMode ? "bg-blue-600 text-white border-blue-600 shadow-lg" : "bg-[#1a237e] text-white border-[#1a237e] shadow-lg") 
                    : (isDarkMode ? (isMarianMode ? "bg-blue-800 text-blue-200 border-blue-700 hover:bg-blue-700" : "bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600") : (isMarianMode ? "bg-blue-50 text-blue-800 border-blue-100 hover:bg-blue-100" : "bg-gray-50 text-gray-600 border-gray-100 hover:bg-gray-100")),
                  isPreviewing === voice && "animate-pulse"
                )}
              >
                {voice}
                {isPreviewing === voice && <Volume2 size={14} className="animate-bounce" />}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Language Section */}
      <section className="space-y-4">
        <h3 className={cn("px-2 text-sm font-black uppercase tracking-widest", isDarkMode ? "text-gray-400" : (isMarianMode ? "text-blue-800" : "text-gray-500"))}>{t[language].language}</h3>
        <div className={cn("rounded-[2.5rem] shadow-sm border overflow-hidden", isDarkMode ? (isMarianMode ? "bg-blue-900/20 border-blue-800" : "bg-gray-800 border-gray-700") : (isMarianMode ? "bg-white border-blue-50" : "bg-white border-amber-50"))}>
          <button 
            onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
            className={cn("w-full p-6 flex justify-between items-center transition-colors", isDarkMode ? (isMarianMode ? "hover:bg-blue-800/50" : "hover:bg-gray-700") : (isMarianMode ? "hover:bg-blue-50" : "hover:bg-gray-50"))}
          >
            <div className="flex items-center gap-4">
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", isDarkMode ? (isMarianMode ? "bg-blue-800 text-blue-300" : "bg-emerald-900/30 text-emerald-400") : (isMarianMode ? "bg-blue-50 text-blue-600" : "bg-emerald-50 text-emerald-600"))}>
                <Globe size={24} />
              </div>
              <div className="text-left">
                <span className={cn("font-bold text-lg block", isDarkMode ? "text-white" : (isMarianMode ? "text-blue-900" : "text-gray-900"))}>
                  {language === 'fr' ? 'Français' : 'English'}
                </span>
                <span className="text-xs text-gray-400">{t[language].appLanguage}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ChevronRight size={20} className="text-gray-300" />
            </div>
          </button>
        </div>
      </section>

      {/* Version Info */}
      <div className="text-center pt-8 opacity-40">
        <p className="text-[10px] font-black text-[#1a237e] uppercase tracking-[0.3em] mb-1">Tessera Digital</p>
        <p className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em]">{t[language].version}</p>
      </div>
    </motion.div>
  );
};

const AboutPage = ({ isDarkMode, isMarianMode }: { isDarkMode: boolean; isMarianMode: boolean }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("p-6 space-y-10 pb-24 transition-colors duration-300", isDarkMode ? (isMarianMode ? "bg-[#0a1128]" : "bg-gray-900") : (isMarianMode ? "bg-[#f0f4f8]" : "bg-[#fdfcf8]"))}
    >
      <div className="text-center space-y-6 pt-4">
        <div className={cn("w-20 h-20 rounded-[1.5rem] flex items-center justify-center shadow-xl mx-auto border-2 overflow-hidden p-2", isDarkMode ? (isMarianMode ? "bg-blue-900 border-blue-800 shadow-blue-900/20" : "bg-gray-800 border-gray-700 shadow-gray-900/20") : (isMarianMode ? "bg-white border-blue-200 shadow-blue-200/20" : "bg-white border-amber-400/30 shadow-blue-900/20"))}>
          <img 
            src="https://png.pngtree.com/png-vector/20241231/ourlarge/pngtree-virgin-mary-in-red-cloak-with-sacred-symbol-png-image_14839357.png" 
            alt="Légion de Marie Logo" 
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
              (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="text-[#1a237e] font-sans italic text-4xl">M</div>';
            }}
          />
        </div>
        <div>
          <h2 className={cn("text-3xl font-serif italic font-bold tracking-tighter", isDarkMode ? "text-white" : (isMarianMode ? "text-blue-900" : "text-[#1a237e]"))}>Tessera Digital</h2>
          <p className={cn("font-black text-[10px] uppercase tracking-[0.4em] mt-3 opacity-60", isDarkMode ? (isMarianMode ? "text-blue-400" : "text-amber-400") : (isMarianMode ? "text-blue-700" : "text-amber-700"))}>Légion de Marie</p>
          <p className={cn("text-[10px] mt-4 font-bold tracking-widest", isDarkMode ? "text-gray-500" : "text-gray-400")}>VERSION 1.0.0 • SPIRITUS SANCTUS</p>
          <p className={cn("text-[10px] mt-1 font-black uppercase tracking-[0.2em] opacity-40", isDarkMode ? "text-gray-500" : "text-gray-400")}>made by Steven Kwdja</p>
        </div>
      </div>

      <div className="space-y-8">
        <section className={cn("p-10 rounded-[3rem] space-y-8 shadow-sm border", isDarkMode ? (isMarianMode ? "bg-blue-900/20 border-blue-800" : "bg-gray-800 border-gray-700") : (isMarianMode ? "bg-white border-blue-50" : "bg-white border-amber-50"))}>
          <h3 className={cn("font-serif italic font-bold text-xl text-center tracking-tight", isDarkMode ? (isMarianMode ? "text-blue-300" : "text-amber-400") : (isMarianMode ? "text-blue-800" : "text-[#1a237e]"))}>À propos de la Légion</h3>
          <div className={cn("space-y-6 text-base leading-relaxed text-center italic font-serif font-medium opacity-90", isDarkMode ? "text-gray-300" : (isMarianMode ? "text-blue-900" : "text-gray-600"))}>
            <p>
              "La Légion de Marie est le plus grand mouvement apostolique de laïcs dans l'Église catholique."
            </p>
            <p>
              Fondée par Frank Duff, elle a pour but la gloire de Dieu par la sainteté de ses membres développée par la prière et une coopération active au travail de Marie et de l'Église.
            </p>
          </div>
        </section>

        <section className={cn("p-10 rounded-[3rem] space-y-8 shadow-sm border", isDarkMode ? (isMarianMode ? "bg-blue-900/20 border-blue-800" : "bg-gray-800 border-gray-700") : (isMarianMode ? "bg-white border-blue-50" : "bg-white border-amber-50"))}>
          <h3 className={cn("font-serif italic font-bold text-xl text-center tracking-tight", isDarkMode ? (isMarianMode ? "text-blue-300" : "text-amber-400") : (isMarianMode ? "text-blue-800" : "text-[#1a237e]"))}>Contact & Réseaux</h3>
          
          <div className="flex flex-col gap-4">
            <a href="mailto:aubinkwdja@gmail.com" className={cn("flex items-center gap-4 p-4 rounded-2xl transition-colors", isDarkMode ? (isMarianMode ? "bg-blue-800/50 hover:bg-blue-800 text-blue-100" : "bg-gray-700/50 hover:bg-gray-700 text-gray-200") : (isMarianMode ? "bg-blue-50 hover:bg-blue-100 text-blue-900" : "bg-gray-50 hover:bg-amber-50 text-gray-700"))}>
              <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0", isDarkMode ? (isMarianMode ? "bg-blue-700 text-blue-300" : "bg-gray-600 text-amber-400") : (isMarianMode ? "bg-white text-blue-800 shadow-sm" : "bg-white text-[#1a237e] shadow-sm"))}>
                <Mail size={20} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm">Nous contacter</p>
                <p className={cn("text-xs", isDarkMode ? (isMarianMode ? "text-blue-300" : "text-gray-400") : (isMarianMode ? "text-blue-600" : "text-gray-500"))}>aubinkwdja@gmail.com</p>
              </div>
            </a>

            <a href="https://www.legionofmary.ie" target="_blank" rel="noopener noreferrer" className={cn("flex items-center gap-4 p-4 rounded-2xl transition-colors", isDarkMode ? (isMarianMode ? "bg-blue-800/50 hover:bg-blue-800 text-blue-100" : "bg-gray-700/50 hover:bg-gray-700 text-gray-200") : (isMarianMode ? "bg-blue-50 hover:bg-blue-100 text-blue-900" : "bg-gray-50 hover:bg-amber-50 text-gray-700"))}>
              <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0", isDarkMode ? (isMarianMode ? "bg-blue-700 text-blue-300" : "bg-gray-600 text-amber-400") : (isMarianMode ? "bg-white text-blue-800 shadow-sm" : "bg-white text-[#1a237e] shadow-sm"))}>
                <Globe size={20} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm">Site Officiel</p>
                <p className={cn("text-xs", isDarkMode ? (isMarianMode ? "text-blue-300" : "text-gray-400") : (isMarianMode ? "text-blue-600" : "text-gray-500"))}>www.legionofmary.ie</p>
              </div>
              <ExternalLink size={16} className={isDarkMode ? (isMarianMode ? "text-blue-400" : "text-gray-500") : (isMarianMode ? "text-blue-400" : "text-gray-400")} />
            </a>

            <div className="flex justify-center gap-4 pt-4">
              <a href="https://www.facebook.com/thelegionofmary" target="_blank" rel="noopener noreferrer" className={cn("w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-110", isDarkMode ? (isMarianMode ? "bg-blue-800 text-blue-300" : "bg-gray-700 text-amber-400") : (isMarianMode ? "bg-blue-100 text-blue-800" : "bg-blue-50 text-[#1a237e]"))}>
                <Facebook size={22} />
              </a>
              <a href="https://twitter.com/LegionofMary" target="_blank" rel="noopener noreferrer" className={cn("w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-110", isDarkMode ? (isMarianMode ? "bg-blue-800 text-blue-300" : "bg-gray-700 text-amber-400") : (isMarianMode ? "bg-blue-100 text-blue-800" : "bg-blue-50 text-[#1a237e]"))}>
                <Twitter size={22} />
              </a>
              <a href="https://www.instagram.com/legionofmary" target="_blank" rel="noopener noreferrer" className={cn("w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-110", isDarkMode ? (isMarianMode ? "bg-blue-800 text-blue-300" : "bg-gray-700 text-amber-400") : (isMarianMode ? "bg-blue-100 text-blue-800" : "bg-blue-50 text-[#1a237e]"))}>
                <Instagram size={22} />
              </a>
            </div>
          </div>
        </section>

        <section className={cn("p-10 rounded-[3rem] shadow-2xl space-y-4 text-center relative overflow-hidden", isDarkMode ? (isMarianMode ? "bg-blue-800 shadow-blue-900/50" : "bg-blue-900 shadow-blue-900/50") : (isMarianMode ? "bg-blue-600 shadow-blue-600/30" : "bg-[#1a237e] shadow-blue-900/30"))}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
          <h3 className={cn("font-serif italic font-bold text-3xl relative z-10", isMarianMode ? "text-blue-100" : "text-amber-400")}>À Jésus par Marie</h3>
          <p className={cn("text-[10px] font-black uppercase tracking-[0.3em] relative z-10 opacity-80", isMarianMode ? "text-blue-200" : "text-blue-100")}>Pour la Gloire de Dieu</p>
        </section>
      </div>
    </motion.div>
  );
};

// --- Main App ---

const CalendarPage = ({ isDarkMode, isMarianMode }: { isDarkMode: boolean, isMarianMode: boolean }) => {
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();
  const dateStr = `${currentMonth.toString().padStart(2, '0')}-${currentDay.toString().padStart(2, '0')}`;

  const todayEvents = LITURGICAL_CALENDAR.filter(e => e.date === dateStr);
  const otherEvents = LITURGICAL_CALENDAR.filter(e => e.date !== dateStr).sort((a, b) => a.date.localeCompare(b.date));

  const getTypeStyles = (type: LiturgicalEvent['type']) => {
    switch (type) {
      case 'solemnity': return isDarkMode ? 'bg-amber-900/40 text-amber-400 border-amber-800' : (isMarianMode ? 'bg-blue-100 text-blue-800 border-blue-200' : 'bg-amber-100 text-amber-800 border-amber-200');
      case 'feast': return isDarkMode ? 'bg-blue-900/40 text-blue-400 border-blue-800' : 'bg-blue-100 text-blue-800 border-blue-200';
      case 'memorial': return isDarkMode ? 'bg-gray-700 text-gray-300 border-gray-600' : 'bg-gray-100 text-gray-800 border-gray-200';
      default: return isDarkMode ? 'bg-gray-800 text-gray-400 border-gray-700' : 'bg-white text-gray-600 border-gray-100';
    }
  };

  const getTypeText = (type: LiturgicalEvent['type']) => {
    switch (type) {
      case 'solemnity': return 'Solennité';
      case 'feast': return 'Fête';
      case 'memorial': return 'Mémoire';
      case 'optional-memorial': return 'Mémoire facultative';
      default: return '';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-10 pb-32"
    >
      <div className="space-y-2">
        <h2 className={cn("text-3xl font-sans font-black tracking-tighter uppercase leading-none", isDarkMode ? "text-white" : (isMarianMode ? "text-blue-900" : "text-[#1a237e]"))}>Calendrier</h2>
        <p className={cn("font-sans italic text-lg opacity-80", isDarkMode ? "text-amber-400" : (isMarianMode ? "text-blue-600" : "text-amber-700"))}>Fêtes et Saints de l'année</p>
      </div>

      {/* Today's Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className={cn("w-8 h-[1px]", isDarkMode ? "bg-gray-700" : (isMarianMode ? "bg-blue-200" : "bg-amber-200"))} />
          <p className={cn("text-[10px] font-black uppercase tracking-[0.4em]", isDarkMode ? "text-amber-400/40" : (isMarianMode ? "text-blue-800/40" : "text-amber-800/40"))}>Aujourd'hui</p>
        </div>

        {todayEvents.length > 0 ? (
          todayEvents.map((event, idx) => (
            <motion.div 
              key={idx}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className={cn("p-8 rounded-[3rem] relative overflow-hidden group shadow-sm border", isDarkMode ? "bg-gray-800 border-gray-700" : (isMarianMode ? "bg-white border-blue-50" : "bg-white border-amber-50"))}
            >
              <div className={cn("absolute top-0 left-0 w-2 h-full", isMarianMode && !isDarkMode ? "bg-blue-400" : "bg-amber-400")} />
              <div className="space-y-4">
                <div className={cn("inline-block px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border", getTypeStyles(event.type))}>
                  {getTypeText(event.type)}
                </div>
                <h3 className={cn("text-2xl font-sans font-bold leading-tight tracking-tight", isDarkMode ? "text-white" : (isMarianMode ? "text-blue-900" : "text-[#1a237e]"))}>{event.title}</h3>
                <p className={cn("leading-relaxed font-medium italic opacity-90", isDarkMode ? "text-gray-300" : "text-gray-600")}>{event.description}</p>
              </div>
            </motion.div>
          ))
        ) : (
          <div className={cn("p-8 rounded-[3rem] border border-dashed text-center", isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white/50 border-gray-200")}>
            <p className="text-gray-400 font-sans italic">Pas de fête majeure aujourd'hui</p>
          </div>
        )}
      </section>

      {/* Upcoming/All Events Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className={cn("w-8 h-[1px]", isDarkMode ? "bg-gray-700" : (isMarianMode ? "bg-blue-200" : "bg-amber-200"))} />
          <p className={cn("text-[10px] font-black uppercase tracking-[0.4em]", isDarkMode ? "text-amber-400/40" : (isMarianMode ? "text-blue-800/40" : "text-amber-800/40"))}>Événements Marquants</p>
        </div>

        <div className="grid gap-4">
          {otherEvents.map((event, idx) => {
            const [month, day] = event.date.split('-');
            const monthNames = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
            
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={cn("p-5 rounded-[2.5rem] border shadow-sm flex items-center gap-6 group transition-all", isDarkMode ? "bg-gray-800 border-gray-700 hover:border-amber-500" : (isMarianMode ? "bg-white border-gray-50 hover:border-blue-200" : "bg-white border-gray-50 hover:border-amber-200"))}
              >
                <div className={cn("flex flex-col items-center justify-center w-16 h-16 rounded-2xl shrink-0", isDarkMode ? "bg-gray-700 text-amber-400" : (isMarianMode ? "bg-blue-50 text-blue-800" : "bg-amber-50 text-amber-800"))}>
                  <span className="text-[10px] font-black uppercase tracking-tighter opacity-60">{monthNames[parseInt(month) - 1]}</span>
                  <span className="text-2xl font-sans font-black leading-none">{day}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={cn("text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded border", getTypeStyles(event.type))}>
                      {getTypeText(event.type)}
                    </span>
                  </div>
                  <h4 className={cn("text-lg font-sans font-bold transition-colors tracking-tight", isDarkMode ? "text-white group-hover:text-amber-500" : (isMarianMode ? "text-blue-900 group-hover:text-blue-600" : "text-[#1a237e] group-hover:text-amber-500"))}>{event.title}</h4>
                  <p className={cn("text-xs italic", isDarkMode ? "text-gray-400" : "text-gray-500")}>{event.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </motion.div>
  );
};

const AppContent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isFirebaseReady, setIsFirebaseReady] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const [isMarianMode, setIsMarianMode] = useState(() => {
    return localStorage.getItem('marianMode') === 'true';
  });
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    return localStorage.getItem('notifications') === 'true';
  });

  useEffect(() => {
    if (notificationsEnabled && 'Notification' in window && Notification.permission !== 'granted') {
      setNotificationsEnabled(false);
      localStorage.setItem('notifications', 'false');
    }
  }, []);
  const [selectedVoice, setSelectedVoice] = useState(() => {
    return localStorage.getItem('voice') || 'Zephyr';
  });

  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('language') as Language) || 'fr';
  });

  // Auth & Sync Logic
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Load initial settings from Firestore if they exist
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setIsDarkMode(data.isDarkMode);
          setIsMarianMode(data.isMarianMode);
          setNotificationsEnabled(data.notificationsEnabled);
          setSelectedVoice(data.selectedVoice);
          setLanguage(data.language);
        } else {
          // Sync current local settings to firestore on first login
          syncUserSettings(currentUser.uid, {
            isDarkMode,
            isMarianMode,
            notificationsEnabled,
            selectedVoice,
            language
          });
        }
      }
      setIsFirebaseReady(true);
    });
    return () => unsubscribe();
  }, []);

  // Sync settings to Firestore whenever they change and user is logged in
  useEffect(() => {
    if (user && isFirebaseReady) {
      syncUserSettings(user.uid, {
        isDarkMode,
        isMarianMode,
        notificationsEnabled,
        selectedVoice,
        language
      });
    }
  }, [isDarkMode, isMarianMode, notificationsEnabled, selectedVoice, language, user, isFirebaseReady]);

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('marianMode', isMarianMode.toString());
  }, [isMarianMode]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const lastTriggeredHourRef = useRef<number>(-1);

  useEffect(() => {
    localStorage.setItem('notifications', notificationsEnabled.toString());
    
    if (!notificationsEnabled) return;

    const checkPrayerTimes = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();

      // Angelus times: 6h, 12h, 18h
      if ((hours === 6 || hours === 12 || hours === 18) && minutes === 0) {
        if (lastTriggeredHourRef.current !== hours) {
          lastTriggeredHourRef.current = hours;
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(t[language].angelusTime, {
              body: t[language].angelusBody,
              icon: "https://png.pngtree.com/png-vector/20241231/ourlarge/pngtree-virgin-mary-in-red-cloak-with-sacred-symbol-png-image_14839357.png"
            });
          }
        }
      } else if (minutes !== 0) {
        lastTriggeredHourRef.current = -1;
      }
    };

    const interval = setInterval(checkPrayerTimes, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, [notificationsEnabled, language]);

  useEffect(() => {
    localStorage.setItem('voice', selectedVoice);
  }, [selectedVoice]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const location = useLocation();

  return (
    <div className={cn(
      "min-h-screen font-sans transition-colors duration-300 selection:bg-amber-200", 
      isDarkMode 
        ? (isMarianMode ? "bg-[#0a1128] text-blue-50" : "bg-gray-900 text-white") 
        : (isMarianMode ? "bg-[#f0f4f8] text-[#0a1128]" : "bg-[#fdfcf8] text-gray-900")
    )}>
      <Drawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} isDarkMode={isDarkMode} isMarianMode={isMarianMode} language={language} />
      
      <GestureHandler onOpenMenu={() => setIsMenuOpen(true)}>
        <Header onOpenMenu={() => setIsMenuOpen(true)} isDarkMode={isDarkMode} isMarianMode={isMarianMode} language={language} />
        
        <main className="max-w-md mx-auto min-h-[calc(100vh-80px)] overflow-x-hidden w-full relative">
          <AnimatePresence mode="wait">
            <motion.div key={location.pathname} className="w-full">
              <Routes location={location}>
              <Route path="/" element={<HomePage isDarkMode={isDarkMode} isMarianMode={isMarianMode} language={language} />} />
              <Route path="/prayers/:category" element={<PrayersListPage isDarkMode={isDarkMode} isMarianMode={isMarianMode} user={user} />} />
              <Route path="/prayer/:id" element={<PrayerDetailPage isDarkMode={isDarkMode} isMarianMode={isMarianMode} user={user} />} />
              <Route path="/mass" element={<MassFlowPage isDarkMode={isDarkMode} isMarianMode={isMarianMode} />} />
              <Route path="/rosary" element={<RosaryPage isDarkMode={isDarkMode} isMarianMode={isMarianMode} />} />
              <Route path="/tessera" element={<TesseraPage isDarkMode={isDarkMode} isMarianMode={isMarianMode} />} />
              <Route path="/calendar" element={<CalendarPage isDarkMode={isDarkMode} isMarianMode={isMarianMode} />} />
              <Route path="/about" element={<AboutPage isDarkMode={isDarkMode} isMarianMode={isMarianMode} />} />
              <Route path="/settings" element={
                <SettingsPage 
                  isDarkMode={isDarkMode}
                  setIsDarkMode={setIsDarkMode}
                  isMarianMode={isMarianMode}
                  setIsMarianMode={setIsMarianMode}
                  notificationsEnabled={notificationsEnabled}
                  setNotificationsEnabled={setNotificationsEnabled}
                  selectedVoice={selectedVoice}
                  setSelectedVoice={setSelectedVoice}
                  language={language}
                  setLanguage={setLanguage}
                  user={user}
                />
              } />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      </GestureHandler>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
