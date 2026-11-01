import React from 'react';
import {Bengala, ChapeuCoco, Pegada} from '../componentes/Formas';
import {BRANCO, CINZA, PRETO, SEPIA, degrau} from '../estilo';

const CHAO = 760;

export const Corpo: React.FC<{f: number}> = ({f}) => {
  const g = degrau(f, 2);
  // ritmo acelerado: o "relógio" da cena anda cada vez mais rápido
  const t = g + (g * g) / 700;

  // pegadas em zigue-zague (bico para fora, como Carlitos andava)
  const pegadas = [...Array(16)].map((_, i) => {
    const surge = i * 14 - (i * i) / 6;
    if (t < surge) return null;
    const x = 150 + i * 110;
    const zig = [0, 1, 2, 1][i % 4];
    const y = 830 + zig * 70 + (i % 2 ? 26 : -26);
    const ang = i % 2 ? 28 : -28;
    return (
      <g key={i} transform={`translate(${x} ${y}) rotate(${ang + 90}) scale(0.62)`} opacity={0.9}>
        <Pegada cor={PRETO} />
      </g>
    );
  });

  // chapéu pulando ao longo do chão
  const pulo = (t % 36) / 36;
  const hx = 120 + ((t * 7) % 1800);
  const hy = CHAO - 30 - Math.sin(pulo * Math.PI) * 260;
  const hrot = Math.floor(t / 36) % 2 ? pulo * 360 : -pulo * 40;

  // bengala girando no ar
  const brot = (t * 22) % 360;
  const bx = 1420 + Math.sin(t / 20) * 120;
  const by = 300 + Math.cos(t / 14) * 50;

  return (
    <svg viewBox="0 0 1920 1080" width={1920} height={1080}>
      <rect width={1920} height={1080} fill={PRETO} />
      <rect x={0} y={CHAO} width={1920} height={320} fill={SEPIA} />
      <line x1={0} y1={CHAO} x2={1920} y2={CHAO} stroke={BRANCO} strokeWidth={4} />
      {pegadas}
      {/* linhas de movimento */}
      {[0, 1, 2].map((i) => (
        <line key={i} x1={hx - 150 - i * 30} y1={hy - 40 + i * 30} x2={hx - 90 - i * 10} y2={hy - 40 + i * 30} stroke={CINZA} strokeWidth={6} strokeLinecap="round" />
      ))}
      <ellipse cx={hx} cy={CHAO + 14} rx={110 - (CHAO - 30 - hy) / 4} ry={16} fill={PRETO} opacity={0.35} />
      <g transform={`translate(${hx} ${hy}) rotate(${hrot})`}>
        <ChapeuCoco cor={PRETO} contorno={BRANCO} detalhe={CINZA} />
      </g>
      <g transform={`translate(${bx} ${by}) rotate(${brot})`}>
        <g transform="translate(34 -200)">
          <Bengala c={400} cor={BRANCO} largura={16} />
        </g>
      </g>
      {[0, 1, 2, 3].map((i) => {
        const a = ((brot + i * 90) * Math.PI) / 180;
        return (
          <path key={i} d={`M ${bx + 230 * Math.cos(a)} ${by + 230 * Math.sin(a)} A 230 230 0 0 1 ${bx + 230 * Math.cos(a + 0.5)} ${by + 230 * Math.sin(a + 0.5)}`} stroke={CINZA} strokeWidth={6} fill="none" strokeLinecap="round" />
        );
      })}
      {/* estrelinhas de tombo */}
      {Math.floor(t / 36) % 2 === 1 &&
        [0, 1, 2].map((i) => {
          const a = (t / 4 + (i * Math.PI * 2) / 3);
          const sx = hx + Math.cos(a) * 120;
          const sy = hy - 90 + Math.sin(a) * 30;
          return <path key={i} d={`M ${sx} ${sy - 20} L ${sx + 6} ${sy - 6} L ${sx + 20} ${sy} L ${sx + 6} ${sy + 6} L ${sx} ${sy + 20} L ${sx - 6} ${sy + 6} L ${sx - 20} ${sy} L ${sx - 6} ${sy - 6} Z`} fill={BRANCO} />;
        })}
    </svg>
  );
};
