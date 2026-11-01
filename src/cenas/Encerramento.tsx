import React from 'react';
import {random} from 'remotion';
import {Bengala, ChapeuCoco} from '../componentes/Formas';
import {BRANCO, CINZA, PRETO, degrau} from '../estilo';
import {CHAO_PALCO, Palco} from './Palco';

export const Encerramento: React.FC<{f: number}> = ({f}) => {
  const g = degrau(f, 2);
  const holofote = g < 8 ? 0 : g < 12 ? 1 : g < 16 ? 0 : 1;
  // o chapéu dá um "tchau": levanta e inclina
  const tchau = g >= 60 && g < 92;
  const poeira = [...Array(14)].map((_, i) => {
    const x = 760 + random(`px${i}`) * 400 + Math.sin((g + i * 20) / 30) * 30;
    const y = 120 + ((random(`py${i}`) * 700 + g * (0.6 + random(`pv${i}`))) % 700);
    return <circle key={i} cx={x} cy={y} r={2 + random(`pr${i}`) * 3} fill={BRANCO} opacity={0.5} />;
  });
  return (
    <Palco abertura={1} holofote={holofote} disco={{x: 960, y: 620, r: 300}}>
      {holofote > 0 && poeira}
      <g transform={`translate(1060 ${CHAO_PALCO - 400}) rotate(10 0 400)`}>
        <Bengala c={400} cor={PRETO} largura={18} />
      </g>
      <ellipse cx={890} cy={CHAO_PALCO + 18} rx={120} ry={12} fill={PRETO} opacity={0.5} />
      <g transform={`translate(890 ${CHAO_PALCO + (tchau ? -30 : 4)}) rotate(${tchau ? -12 : 0})`}>
        <ChapeuCoco cor={PRETO} detalhe={CINZA} />
      </g>
    </Palco>
  );
};
