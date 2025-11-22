import React from 'react';
import { Theater, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="w-full py-8 px-4 flex flex-col items-center justify-center text-center animate-fade-in-down">
      <div className="flex items-center gap-3 mb-2">
        <Theater className="w-10 h-10 text-gold-400" />
        <h1 className="text-4xl md:text-5xl font-display text-white tracking-wider">
          Dramas <span className="text-gold-400">Psicossociais</span>
        </h1>
        <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
      </div>
      <p className="text-drama-100 font-serif italic text-lg max-w-xl mt-4 opacity-80">
        "O teatro é a arte de ver a nós mesmos através dos outros."
      </p>
      <div className="h-1 w-24 bg-gradient-to-r from-transparent via-gold-500 to-transparent mt-6 rounded-full"></div>
    </header>
  );
};