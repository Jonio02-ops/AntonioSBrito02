import React from 'react';
import {random} from 'remotion';
import {Bengala, ChapeuCoco, Nota} from '../componentes/Formas';
import {BRANCO, CINZA, PRETO, SEPIA, degrau} from '../estilo';

/** Fileira de cabeças da plateia vista de trás. */
const Fileira: React.FC<{y: number; r: number; n: number; desloc: number; f: number; s: number}> = ({y, r, n, desloc, f, s}) => (
  <g>
    {[...Array(n)].map((_, i) => {
      const x = desloc + (i * 1920) / (n - 1);
      const bob = Math.floor((f + i * 13 + s) / 20) % 4 === 0 ? -4 : 0;
      const chapeu = random(`ch${s}-${i}`);
      return (
        <g key={i} transform={`translate(${x} ${y + bob})`}>
          <path d={`M ${-r * 1.7} ${r * 3} Q ${-r * 1.7} ${r * 0.9} 0 ${r * 0.8} Q ${r * 1.7} ${r * 0.9} ${r * 1.7} ${r * 3} Z`} fill={PRETO} stroke={CINZA} strokeWidth={4} />
          <circle cx={0} cy={0} r={r} fill={PRETO} stroke={CINZA} strokeWidth={4} />
          {chapeu < 0.3 && (
            <g transform={`translate(0 ${-r * 0.55}) scale(${r / 105})`}>
              <ChapeuCoco cor={PRETO} contorno={CINZA} detalhe={PRETO} />
            </g>
          )}
          {chapeu > 0.8 && (
            <ellipse cx={0} cy={-r * 0.7} rx={r * 1.5} ry={r * 0.32} fill={PRETO} stroke={CINZA} strokeWidth={4} />
          )}
        </g>
      );
    })}
  </g>
);

export const CinemaMudo: React.FC<{f: number}> = ({f}) => {
  const g = degrau(f, 2);
  const tremeTela = 0.88 + (Math.floor(g / 2) % 3) * 0.05;
  // filminho na tela: Carlitos andando
  const px = 640 + ((g * 4) % 680);
  const passo = Math.floor(g / 6) % 2;
  const notas = [...Array(7)].map((_, i) => {
    const t = ((g + i * 14) % 96) / 96;
    const x = 330 + Math.sin(t * 9 + i) * 40 + (i % 3) * 30;
    const y = 590 - t * 420;
    return (
      <g key={i} transform={`translate(${x} ${y}) scale(${0.8 + (i % 2) * 0.3})`} opacity={t < 0.1 ? t * 10 : t > 0.8 ? (1 - t) * 5 : 1}>
        <Nota cor={i % 2 ? BRANCO : SEPIA} dupla={i % 3 === 1} />
      </g>
    );
  });
  return (
    <svg viewBox="0 0 1920 1080" width={1920} height={1080}>
      <rect width={1920} height={1080} fill={PRETO} />
      {/* feixe do projetor (vem de trás, do alto) */}
      <polygon points="930,1080 990,1080 1400,630 600,630" fill={BRANCO} opacity={0.1} />
      {/* moldura e tela */}
      <rect x={560} y={150} width={840} height={480} fill="none" stroke={SEPIA} strokeWidth={14} />
      <rect x={576} y={166} width={808} height={448} fill={BRANCO} opacity={tremeTela} />
      {/* filminho */}
      <g transform={`translate(${px} 470)`}>
        <g transform="translate(0 -170) scale(0.42)">
          <ChapeuCoco />
        </g>
        <rect x={-22} y={-160} width={44} height={70} fill={PRETO} />
        <circle cx={0} cy={-170} r={22} fill={PRETO} />
        <path d={passo ? 'M -10 -92 L -40 0 M 10 -92 L 30 0' : 'M -10 -92 L -20 0 M 10 -92 L 10 0'} stroke={PRETO} strokeWidth={22} strokeLinecap="round" />
        <rect x={-62} y={-8} width={46} height={16} rx={8} fill={PRETO} />
        <rect x={6} y={-8} width={46} height={16} rx={8} fill={PRETO} />
        <g transform={`translate(44 -100) rotate(${passo ? 10 : -10})`}>
          <Bengala c={100} cor={PRETO} largura={7} />
        </g>
      </g>
      {/* cortinas laterais */}
      <path d="M 470 120 Q 520 380 470 660 L 400 660 L 400 120 Z" fill={SEPIA} />
      <path d="M 1490 120 Q 1440 380 1490 660 L 1560 660 L 1560 120 Z" fill={SEPIA} />
      <rect x={400} y={100} width={1160} height={30} fill={SEPIA} />
      {/* piano no canto, com pianista */}
      <g>
        <rect x={150} y={600} width={340} height={230} fill={PRETO} stroke={SEPIA} strokeWidth={6} />
        <rect x={130} y={680} width={380} height={34} fill={BRANCO} />
        {[...Array(14)].map((_, i) => (
          <rect key={i} x={140 + i * 26} y={680} width={12} height={20} fill={PRETO} />
        ))}
        <rect x={170} y={830} width={20} height={60} fill={SEPIA} />
        <rect x={450} y={830} width={20} height={60} fill={SEPIA} />
        {/* pianista de costas */}
        <rect x={250} y={760} width={140} height={20} fill={SEPIA} />
        <path d="M 280 760 Q 270 650 320 640 Q 370 650 362 760 Z" fill={PRETO} stroke={CINZA} strokeWidth={4} />
        <circle cx={320} cy={612} r={34} fill={PRETO} stroke={CINZA} strokeWidth={4} />
        <path
          d={Math.floor(g / 4) % 2 ? 'M 290 680 L 230 700 M 352 680 L 410 690' : 'M 290 680 L 240 690 M 352 680 L 400 700'}
          stroke={PRETO}
          strokeWidth={18}
          strokeLinecap="round"
        />
      </g>
      {notas}
      {/* plateia */}
      <Fileira y={905} r={54} n={9} desloc={-40} f={g} s={2} />
      <Fileira y={1020} r={72} n={7} desloc={-120} f={g} s={3} />
    </svg>
  );
};
