import React, { useState } from 'react';
import { PlayRequest, PlayTone } from '../types';
import { Feather, Users, Smile } from 'lucide-react';

interface InputFormProps {
  onSubmit: (request: PlayRequest) => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [need, setNeed] = useState('');
  const [tone, setTone] = useState<PlayTone>(PlayTone.DRAMATIC);
  const [characters, setCharacters] = useState(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (need.trim().length < 5) return;
    onSubmit({ need, tone, characters });
  };

  const inspirationChips = [
    "Solidão em cidades grandes",
    "Conflito de gerações na família",
    "Medo de falhar no trabalho",
    "Superação de um luto",
    "Bullying escolar"
  ];

  return (
    <div className="w-full max-w-2xl mx-auto bg-drama-800/50 backdrop-blur-sm border border-drama-700 p-6 md:p-8 rounded-2xl shadow-2xl">
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Scenario Input */}
        <div className="space-y-3">
          <label htmlFor="need" className="block text-xl font-display text-gold-400">
            Qual é o conflito humano?
          </label>
          <p className="text-sm text-gray-300 mb-2">Descreva a situação social ou psicológica que precisa ser explorada.</p>
          <textarea
            id="need"
            value={need}
            onChange={(e) => setNeed(e.target.value)}
            placeholder="Ex: Meus alunos estão tendo dificuldade em aceitar as diferenças uns dos outros..."
            className="w-full h-32 bg-drama-900 border border-drama-700 rounded-lg p-4 text-gray-100 placeholder-gray-600 focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all resize-none font-serif text-lg"
            disabled={isLoading}
            required
          />
          
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="text-xs text-gray-400 uppercase tracking-wide mr-2 self-center">Sugestões:</span>
            {inspirationChips.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => setNeed(chip)}
                className="text-xs bg-drama-700 hover:bg-drama-600 text-drama-100 px-3 py-1 rounded-full transition-colors border border-drama-600"
                disabled={isLoading}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tone Selection */}
          <div className="space-y-3">
            <label className="flex items-center text-lg font-display text-gold-400 gap-2">
              <Smile className="w-5 h-5" /> Tom da Peça
            </label>
            <div className="relative">
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value as PlayTone)}
                className="w-full bg-drama-900 border border-drama-700 text-gray-200 p-3 rounded-lg appearance-none focus:ring-2 focus:ring-gold-500 cursor-pointer"
                disabled={isLoading}
              >
                {Object.values(PlayTone).map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <div className="absolute right-3 top-3.5 pointer-events-none text-gold-500">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
              </div>
            </div>
          </div>

          {/* Characters Selection */}
          <div className="space-y-3">
            <label className="flex items-center text-lg font-display text-gold-400 gap-2">
              <Users className="w-5 h-5" /> Personagens
            </label>
            <div className="flex items-center justify-between bg-drama-900 border border-drama-700 rounded-lg p-2">
              <button
                type="button"
                onClick={() => setCharacters(Math.max(1, characters - 1))}
                className="w-10 h-10 flex items-center justify-center bg-drama-800 hover:bg-drama-700 text-gold-400 rounded transition-colors disabled:opacity-50"
                disabled={isLoading || characters <= 1}
              >
                -
              </button>
              <span className="text-xl font-bold text-white w-8 text-center">{characters}</span>
              <button
                type="button"
                onClick={() => setCharacters(Math.min(6, characters + 1))}
                className="w-10 h-10 flex items-center justify-center bg-drama-800 hover:bg-drama-700 text-gold-400 rounded transition-colors disabled:opacity-50"
                disabled={isLoading || characters >= 6}
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 flex justify-center">
          <button
            type="submit"
            disabled={isLoading || need.trim().length < 3}
            className={`
              group relative overflow-hidden rounded-lg px-12 py-4 transition-all duration-300
              ${isLoading 
                ? 'bg-gray-700 cursor-not-allowed opacity-70' 
                : 'bg-gold-500 hover:bg-gold-400 text-drama-900 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]'}
            `}
          >
            <span className="relative z-10 flex items-center gap-3 text-lg font-bold tracking-wide uppercase">
              {isLoading ? 'Escrevendo o Roteiro...' : 'Criar Peça'}
              {!isLoading && <Feather className="w-5 h-5 group-hover:rotate-12 transition-transform" />}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};