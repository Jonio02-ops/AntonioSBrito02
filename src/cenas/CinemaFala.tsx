import React from 'react';
import {random} from 'remotion';
import {Nota} from '../componentes/Formas';
import {BRANCO, FONTE_TITULO, PRETO, SEPIA, degrau, lerp} from '../estilo';

const PALAVRAS = ['Olá!', 'Oi!', 'Uau!', 'Viva!', 'Ah!', 'Ei!', 'Bravo!', 'Hã?', 'Psiu!', 'Ufa!'];
const N = 34;
const VIDA = 80;

export const CinemaFala: React.FC<{f: number}> = ({f}) => {
  const g = degrau(f, 2);
  const itens: React.ReactNode[] = [];
  for (let k = 0; k < N; k++) {
    // cada vez mais balões: os nascimentos se acumulam no fim
    const nasce = 12 + 200 * Math.sqrt(k / N);
    const t = (g - nasce) / VIDA;
    if (t < 0 || t > 1) continue;
    const ang = random(`a${k}`) * Math.PI * 2;
    const ox = 960 + Math.cos(ang) * 260;
    const oy = 420 + Math.sin(ang) * 140;
    const dist = 260 + random(`d${k}`) * 260;
    const x = ox + Math.cos(ang) * dist * t;
    const y = oy + Math.sin(ang) * dist * t * 0.8;
    const esc = lerp(t, [0, 0.12], [0.2, 1]);
    const op = t > 0.82 ? (1 - t) / 0.18 : 1;
    if (k % 3 === 2) {
      itens.push(
        <g key={k} transform={`translate(${x} ${y}) scale(${esc * 1.3})`} opacity={op}>
          <Nota cor={k % 2 ? SEPIA : BRANCO} dupla={k % 4 === 1} />
        </g>,
      );
    } else {
      const palavra = PALAVRAS[k % PALAVRAS.length];
      const w = 70 + palavra.length * 34;
      const tx = -Math.cos(ang) * 70;
      const ty = -Math.sin(ang) * 70;
      itens.push(
        <g key={k} transform={`translate(${x} ${y}) scale(${esc})`} opacity={op}>
          <path d={`M ${tx * 0.3 - 22} ${ty * 0.3} L ${tx * 1.6} ${ty * 1.6 + 30} L ${tx * 0.3 + 22} ${ty * 0.3} Z`} fill={BRANCO} stroke={PRETO} strokeWidth={5} />
          <ellipse rx={w} ry={78} fill={BRANCO} stroke={PRETO} strokeWidth={5} />
          <text y={22} textAnchor="middle" fontFamily={FONTE_TITULO} fontSize={64} fill={PRETO}>
            {palavra}
          </text>
        </g>,
      );
    }
  }
  const brilho = 0.9 + (Math.floor(g / 2) % 3) * 0.04;
  return (
    <svg viewBox="0 0 1920 1080" width={1920} height={1080}>
      <rect width={1920} height={1080} fill={PRETO} />
      {/* tela */}
      <rect x={470} y={130} width={980} height={580} fill="none" stroke={SEPIA} strokeWidth={16} />
      <rect x={488} y={148} width={944} height={544} fill={BRANCO} opacity={brilho} />
      {/* microfone antigo na tela */}
      <g fill={PRETO}>
        <rect x={948} y={470} width={24} height={170} />
        <ellipse cx={960} cy={650} rx={90} ry={24} />
        <rect x={920} y={330} width={80} height={150} rx={40} />
        {[360, 390, 420, 450].map((y) => (
          <rect key={y} x={928} y={y} width={64} height={8} fill={BRANCO} opacity={0.5} />
        ))}
      </g>
      {[1, 2, 3].map((i) => {
        const on = Math.floor(g / 6 + i) % 3 !== 0;
        return (
          <g key={i} opacity={on ? 1 : 0.2} stroke={PRETO} strokeWidth={8} fill="none" strokeLinecap="round">
            <path d={`M ${1030 + i * 45} ${330} A ${40 + i * 45} ${40 + i * 45} 0 0 1 ${1030 + i * 45} ${480}`} />
            <path d={`M ${890 - i * 45} ${330} A ${40 + i * 45} ${40 + i * 45} 0 0 0 ${890 - i * 45} ${480}`} />
          </g>
        );
      })}
      {/* cortinas e palco da sala */}
      <path d="M 380 100 Q 440 420 380 760 L 300 760 L 300 100 Z" fill={SEPIA} />
      <path d="M 1540 100 Q 1480 420 1540 760 L 1620 760 L 1620 100 Z" fill={SEPIA} />
      <rect x={300} y={760} width={1320} height={24} fill={SEPIA} />
      {itens}
    </svg>
  );
};
