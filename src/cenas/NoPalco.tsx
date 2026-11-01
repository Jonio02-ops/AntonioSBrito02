import React from 'react';
import {Nota, Pose, Silhueta} from '../componentes/Formas';
import {PRETO, SEPIA, degrau, lerp, suave} from '../estilo';
import {CHAO_PALCO, Palco} from './Palco';

// Criança: ~320 px de altura, pés no chão do palco.
const crianca = (bracos: number, balanco: number): Pose => {
  const x = 960 + balanco;
  const y = CHAO_PALCO - 10;
  return {
    cabeca: [x, y - 290],
    pescoco: [x, y - 245],
    quadril: [x, y - 140],
    cotoveloE: [x - 40 - bracos * 20, y - 210 - bracos * 30],
    maoE: [x - 60 - bracos * 50, y - 160 - bracos * 110],
    cotoveloD: [x + 40 + bracos * 20, y - 210 - bracos * 30],
    maoD: [x + 60 + bracos * 50, y - 160 - bracos * 110],
    joelhoE: [x - 22, y - 70],
    peE: [x - 30, y],
    joelhoD: [x + 22, y - 70],
    peD: [x + 30, y],
  };
};

export const NoPalco: React.FC<{f: number}> = ({f}) => {
  const g = degrau(f, 2);
  const abertura = lerp(g, [6, 60], [0, 1], suave);
  // holofote acende "falhando": liga, apaga, liga
  const holofote = g < 66 ? 0 : g < 72 ? 1 : g < 78 ? 0 : 1;
  const cantando = f >= 120; // 2º quadro ilustrado
  const bracos = cantando ? 1 : lerp(g, [84, 110], [0, 0.25]);
  const balanco = cantando ? Math.sin(g / 7) * 10 : 0;
  const notas = cantando
    ? [0, 1, 2, 3, 4, 5].map((i) => {
        const t = (g - 120 - i * 12) / 60;
        if (t < 0 || t > 1) return null;
        const x = 960 + (i % 2 ? 1 : -1) * (90 + t * 160) + Math.sin(t * 8) * 20;
        const y = CHAO_PALCO - 330 - t * 300;
        return (
          <g key={i} transform={`translate(${x} ${y}) scale(${0.9 + (i % 3) * 0.2})`} opacity={t > 0.8 ? (1 - t) * 5 : 1}>
            <Nota cor={i % 2 ? PRETO : SEPIA} dupla={i % 3 === 0} />
          </g>
        );
      })
    : null;
  return (
    <Palco abertura={abertura} holofote={holofote} disco={{x: 960, y: 560, r: 300}}>
      <Silhueta pose={crianca(bracos, balanco)} tronco={56} membro={22} raioCabeca={34} chapeuInfantil />
      {notas}
    </Palco>
  );
};
