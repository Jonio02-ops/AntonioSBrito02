import React from 'react';
import {BRANCO, CINZA, PRETO, SEPIA} from '../estilo';

export const CHAO_PALCO = 860;

/** Metade de cortina, desenhada a partir da borda esquerda (x=0), largura w. */
const Cortina: React.FC<{w: number}> = ({w}) => {
  const dobras = Math.max(3, Math.round(w / 70));
  return (
    <g>
      <rect x={0} y={0} width={w} height={1080} fill={SEPIA} />
      {[...Array(dobras)].map((_, i) => (
        <rect key={i} x={((i + 0.55) * w) / dobras} y={0} width={Math.max(6, w / dobras / 4)} height={1080} fill={PRETO} opacity={0.35} />
      ))}
      <rect x={w - 10} y={0} width={10} height={1080} fill={PRETO} opacity={0.4} />
    </g>
  );
};

/**
 * Palco de teatro: cortinas (abertura 0 = fechada, 1 = aberta),
 * holofote (0..1) com um disco de luz na parede do fundo.
 */
export const Palco: React.FC<{
  abertura: number;
  holofote: number;
  disco?: {x: number; y: number; r: number};
  children?: React.ReactNode;
  frente?: React.ReactNode;
}> = ({abertura, holofote, disco = {x: 960, y: 600, r: 290}, children, frente}) => {
  const metade = 960 - 130;
  const w = metade - abertura * (metade - 190);
  return (
    <svg viewBox="0 0 1920 1080" width={1920} height={1080}>
      <rect width={1920} height={1080} fill={PRETO} />
      {/* parede do fundo, tábuas */}
      <rect x={0} y={0} width={1920} height={CHAO_PALCO} fill={PRETO} />
      {/* holofote */}
      {holofote > 0 && (
        <g opacity={holofote}>
          <polygon
            points={`${disco.x - 50},0 ${disco.x + 50},0 ${disco.x + disco.r * 1.05},${disco.y + disco.r * 0.4} ${disco.x - disco.r * 1.05},${disco.y + disco.r * 0.4}`}
            fill={BRANCO}
            opacity={0.13}
          />
          <circle cx={disco.x} cy={disco.y} r={disco.r} fill={BRANCO} opacity={0.88} />
          <circle cx={disco.x} cy={disco.y} r={disco.r} fill="none" stroke={SEPIA} strokeWidth={10} />
        </g>
      )}
      {/* chão do palco */}
      <rect x={0} y={CHAO_PALCO} width={1920} height={220} fill={SEPIA} opacity={0.55} />
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1={0} y1={CHAO_PALCO + 30 + i * 50} x2={1920} y2={CHAO_PALCO + 30 + i * 50} stroke={PRETO} strokeWidth={3} opacity={0.5} />
      ))}
      {holofote > 0 && (
        <ellipse cx={disco.x} cy={CHAO_PALCO + 40} rx={disco.r * 1.1} ry={50} fill={BRANCO} opacity={0.55 * holofote} />
      )}
      {children}
      {/* ribalta */}
      {[...Array(16)].map((_, i) => (
        <path key={i} d={`M ${160 + i * 107} ${CHAO_PALCO + 8} a 18 14 0 0 1 36 0 Z`} fill={BRANCO} opacity={0.9} />
      ))}
      {/* cortinas */}
      <g transform="translate(130 0)">
        <Cortina w={w} />
      </g>
      <g transform="translate(1790 0) scale(-1 1)">
        <Cortina w={w} />
      </g>
      {/* proscênio */}
      <rect x={0} y={0} width={130} height={1080} fill={PRETO} />
      <rect x={1790} y={0} width={130} height={1080} fill={PRETO} />
      <line x1={126} y1={0} x2={126} y2={1080} stroke={SEPIA} strokeWidth={6} />
      <line x1={1794} y1={0} x2={1794} y2={1080} stroke={SEPIA} strokeWidth={6} />
      <rect x={0} y={0} width={1920} height={110} fill={CINZA} />
      {[...Array(13)].map((_, i) => (
        <path key={i} d={`M ${i * 160} 110 a 80 46 0 0 0 160 0 Z`} fill={CINZA} />
      ))}
      <line x1={0} y1={30} x2={1920} y2={30} stroke={SEPIA} strokeWidth={6} />
      <line x1={0} y1={44} x2={1920} y2={44} stroke={SEPIA} strokeWidth={2} />
      {frente}
    </svg>
  );
};
