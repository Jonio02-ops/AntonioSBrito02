import React from 'react';

export const LoadingCurtain: React.FC = () => {
  return (
    <div className="w-full h-64 flex flex-col items-center justify-center space-y-6 animate-pulse">
      <div className="text-6xl animate-bounce">🎭</div>
      <h3 className="text-2xl font-display text-gold-400 tracking-wider">
        Afinando os instrumentos...
      </h3>
      <p className="text-drama-100 italic opacity-70">
        Nossa musa digital está escrevendo sua cena.
      </p>
      <div className="w-48 h-1 bg-drama-800 rounded-full overflow-hidden mt-4">
        <div className="h-full bg-gold-500 animate-[shimmer_2s_infinite_linear]" style={{ width: '50%' }}></div>
      </div>
    </div>
  );
};