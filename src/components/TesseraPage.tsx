import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { TESSERA_CONTENT, VEXILLUM_INFO } from '../data';

interface TesseraPageProps {
  isDarkMode: boolean;
  isMarianMode: boolean;
}

export const TesseraPage: React.FC<TesseraPageProps> = ({ isDarkMode, isMarianMode }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("p-6 space-y-8 pb-24 transition-colors duration-300", isDarkMode ? (isMarianMode ? "bg-[#0a1128]" : "bg-gray-900") : (isMarianMode ? "bg-[#f0f4f8]" : "bg-[#fdfcf8]"))}
    >
      <div className="px-2">
        <h2 className={cn("text-4xl font-serif italic font-bold tracking-tight", isDarkMode ? "text-white" : (isMarianMode ? "text-blue-900" : "text-[#1a237e]"))}>Tessera</h2>
      </div>

      {/* History Section */}
      <section className={cn("p-8 rounded-[2.5rem] shadow-sm border", isDarkMode ? (isMarianMode ? "bg-blue-900/20 border-blue-800" : "bg-gray-800 border-gray-700") : (isMarianMode ? "bg-white border-blue-50" : "bg-white border-amber-50"))}>
        <h3 className={cn("text-xl font-sans font-bold mb-4", isDarkMode ? "text-white" : (isMarianMode ? "text-blue-900" : "text-[#1a237e]"))}>Histoire</h3>
        <p className={cn("leading-relaxed", isDarkMode ? "text-gray-300" : "text-gray-600")}>{TESSERA_CONTENT.history}</p>
      </section>

      {/* Sections */}
      <div className="space-y-6">
        {TESSERA_CONTENT.sections.map((section, index) => (
          <section 
            key={index}
            className={cn("p-8 rounded-[2.5rem] shadow-sm border", isDarkMode ? (isMarianMode ? "bg-blue-900/20 border-blue-800" : "bg-gray-800 border-gray-700") : (isMarianMode ? "bg-white border-blue-50" : "bg-white border-amber-50"))}
          >
            <h3 className={cn("text-xl font-sans font-bold mb-4", isDarkMode ? "text-white" : (isMarianMode ? "text-blue-900" : "text-[#1a237e]"))}>{section.title}</h3>
            <p className={cn("leading-relaxed whitespace-pre-line", isDarkMode ? "text-gray-300" : "text-gray-600")}>{section.content}</p>
          </section>
        ))}
      </div>

      {/* Vexillum Section */}
      <section id="vexillum" className="space-y-8 pt-8 border-t border-gray-200 dark:border-gray-800">
        <div className="px-2">
          <p className={cn("text-[10px] font-black uppercase tracking-[0.3em] mb-2 opacity-60", isDarkMode ? (isMarianMode ? "text-blue-400" : "text-amber-400") : (isMarianMode ? "text-blue-700" : "text-amber-700"))}>Légion de Marie</p>
          <h2 className={cn("text-3xl font-serif italic font-bold tracking-tight", isDarkMode ? "text-white" : (isMarianMode ? "text-blue-900" : "text-[#1a237e]"))}>{VEXILLUM_INFO.title}</h2>
        </div>

        <div className={cn("p-8 rounded-[3rem] space-y-8 shadow-sm border", isDarkMode ? (isMarianMode ? "bg-blue-900/20 border-blue-800" : "bg-gray-800 border-gray-700") : (isMarianMode ? "bg-white border-blue-50" : "bg-white border-amber-50"))}>
          <div className="flex flex-col items-center text-center space-y-6">
            <div className={cn("w-32 h-32 rounded-full flex items-center justify-center p-6 shadow-inner border relative overflow-hidden", isDarkMode ? (isMarianMode ? "bg-blue-800 border-blue-700" : "bg-gray-700 border-gray-600") : (isMarianMode ? "bg-blue-50 border-blue-100" : "bg-amber-50 border-amber-100"))}>
              <img 
                src={VEXILLUM_INFO.image} 
                alt="Vexillum Legionis" 
                className="w-full h-full object-contain relative z-10"
                referrerPolicy="no-referrer"
              />
              <div className={cn("absolute inset-0 bg-gradient-to-tr pointer-events-none", isMarianMode ? "from-blue-400/5 to-transparent" : "from-amber-400/5 to-transparent")} />
            </div>
            <div className="space-y-4">
              <h3 className={cn("text-xl font-bold", isDarkMode ? (isMarianMode ? "text-blue-300" : "text-amber-400") : (isMarianMode ? "text-blue-800" : "text-[#1a237e]"))}>Histoire</h3>
              <p className={cn("leading-relaxed italic font-serif text-lg opacity-90", isDarkMode ? "text-gray-300" : (isMarianMode ? "text-blue-900" : "text-gray-600"))}>
                {VEXILLUM_INFO.history}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className={cn("px-2 text-sm font-black uppercase tracking-widest", isDarkMode ? "text-gray-400" : (isMarianMode ? "text-blue-800" : "text-gray-500"))}>Symbolique</h3>
          <div className="grid gap-4">
            {VEXILLUM_INFO.symbolism.map((symbol, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={cn("p-6 rounded-[2rem] border shadow-sm space-y-2", isDarkMode ? (isMarianMode ? "bg-blue-900/20 border-blue-800" : "bg-gray-800 border-gray-700") : (isMarianMode ? "bg-white border-blue-50" : "bg-white border-amber-50"))}
              >
                <h4 className={cn("font-bold flex items-center gap-2", isDarkMode ? (isMarianMode ? "text-blue-300" : "text-amber-400") : (isMarianMode ? "text-blue-800" : "text-[#1a237e]"))}>
                  <div className={cn("w-2 h-2 rounded-full", isMarianMode ? "bg-blue-400" : "bg-amber-400")} />
                  {symbol.item}
                </h4>
                <p className={cn("text-sm leading-relaxed", isDarkMode ? "text-gray-400" : "text-gray-500")}>{symbol.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className={cn("p-10 rounded-[3rem] shadow-2xl space-y-6 relative overflow-hidden", isDarkMode ? "bg-blue-900 shadow-blue-900/50" : "bg-[#1a237e] shadow-blue-900/30")}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
          <h3 className="font-serif italic font-bold text-2xl text-amber-400 relative z-10">Signification Spirituelle</h3>
          <p className="text-blue-100 leading-relaxed text-lg italic font-serif relative z-10 opacity-90">
            {VEXILLUM_INFO.detailedDescription}
          </p>
        </div>
      </section>
    </motion.div>
  );
};
