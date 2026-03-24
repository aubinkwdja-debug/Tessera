import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { TESSERA_CONTENT } from '../data';

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
    </motion.div>
  );
};
