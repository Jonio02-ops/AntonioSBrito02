import React, { useRef } from 'react';
import { PlayResponse } from '../types';
import { Download, RefreshCw, ArrowLeft } from 'lucide-react';

interface PlayDisplayProps {
  play: PlayResponse;
  onReset: () => void;
}

export const PlayDisplay: React.FC<PlayDisplayProps> = ({ play, onReset }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleCopy = () => {
    if (contentRef.current) {
      const text = `TÍTULO: ${play.title}\n\nSINOPSE: ${play.synopsis}\n\n${play.content}`;
      navigator.clipboard.writeText(text);
      alert('Copiado para a área de transferência!');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in-up pb-12">
      
      {/* Controls */}
      <div className="flex justify-between items-center mb-6 px-4">
        <button 
          onClick={onReset}
          className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Criar Nova</span>
        </button>

        <button 
          onClick={handleCopy}
          className="flex items-center gap-2 bg-drama-700 hover:bg-drama-600 text-white px-4 py-2 rounded-lg transition-colors border border-drama-600"
        >
          <Download className="w-4 h-4" />
          <span>Copiar Texto</span>
        </button>
      </div>

      {/* The Script "Paper" */}
      <div 
        ref={contentRef}
        className="bg-[#fcfbf7] text-gray-900 p-8 md:p-12 lg:p-16 rounded-sm shadow-2xl min-h-[600px] relative overflow-hidden"
        style={{
          backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")',
        }}
      >
        {/* Binding effect on the left */}
        <div className="absolute top-0 bottom-0 left-0 w-2 bg-gradient-to-r from-black/10 to-transparent"></div>

        <div className="max-w-3xl mx-auto font-serif">
          <header className="text-center mb-12 border-b-2 border-gray-800 pb-8">
            <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-widest mb-4 text-black">
              {play.title}
            </h2>
            <div className="w-16 h-1 bg-black mx-auto mb-6"></div>
            <p className="text-lg italic text-gray-700 leading-relaxed max-w-xl mx-auto">
              "{play.synopsis}"
            </p>
          </header>

          <div className="prose prose-lg max-w-none prose-p:text-gray-800 prose-headings:font-display prose-headings:text-black">
             {/* Render content with line breaks preserved */}
            <div className="whitespace-pre-wrap leading-relaxed">
              {play.content}
            </div>
          </div>

          <footer className="mt-16 pt-8 border-t border-gray-300 text-center text-sm text-gray-500 font-sans uppercase tracking-widest">
            Fim da Peça • Gerado por Dramas Psicossociais
          </footer>
        </div>
      </div>
    </div>
  );
};