import React from 'react';
import {Coracao} from '../componentes/Formas';
import {BRANCO, CINZA, PRETO, SEPIA, degrau, lerp, suave} from '../estilo';

const Rolo: React.FC<{cx: number; cy: number; r: number; giro: number}> = ({cx, cy, r, giro}) => (
  <g transform={`translate(${cx} ${cy}) rotate(${giro})`}>
    <circle r={r} fill={PRETO} stroke={BRANCO} strokeWidth={6} />
    {[0, 72, 144, 216, 288].map((a) => (
      <circle key={a} cx={r * 0.55 * Math.cos((a * Math.PI) / 180)} cy={r * 0.55 * Math.sin((a * Math.PI) / 180)} r={r * 0.2} fill={SEPIA} />
    ))}
    <circle r={r * 0.12} fill={BRANCO} />
  </g>
);

export const Camera: React.FC<{f: number}> = ({f}) => {
  const g = degrau(f, 2);
  const giro = g * 8;
  const manivela = (g * 12 * Math.PI) / 180;
  const mx = 960 + 80 * Math.cos(manivela);
  const my = 510 + 80 * Math.sin(manivela);

  // 2º quadro ilustrado (a partir de 4 s): coração sai da lente
  const t = lerp(f, [120, 170], [0, 1], suave);
  const batida = f > 170 ? 1 + 0.08 * Math.abs(Math.sin((g - 170) / 5)) : 1;
  const hx = 1330 + t * 250;
  const hy = 500 - t * 150;
  return (
    <svg viewBox="0 0 1920 1080" width={1920} height={1080}>
      <rect width={1920} height={1080} fill={PRETO} />
      <circle cx={960} cy={560} r={470} fill={SEPIA} />
      <circle cx={960} cy={560} r={470} fill="none" stroke={BRANCO} strokeWidth={6} />
      {/* tripé */}
      <path d="M 960 640 L 780 1000 M 960 640 L 1140 1000 M 960 640 L 960 1010" stroke={PRETO} strokeWidth={22} strokeLinecap="round" />
      {/* rolos de filme */}
      <Rolo cx={860} cy={290} r={100} giro={giro} />
      <Rolo cx={1070} cy={290} r={100} giro={giro} />
      <path d="M 860 390 L 930 400 M 1070 390 L 1000 400" stroke={PRETO} strokeWidth={8} />
      {/* corpo de madeira */}
      <rect x={760} y={390} width={420} height={260} rx={18} fill={PRETO} stroke={BRANCO} strokeWidth={6} />
      <rect x={790} y={420} width={110} height={70} fill="none" stroke={CINZA} strokeWidth={5} />
      {/* lente */}
      <rect x={1180} y={450} width={90} height={120} fill={PRETO} stroke={BRANCO} strokeWidth={6} />
      <path d="M 1270 430 L 1330 410 L 1330 610 L 1270 590 Z" fill={PRETO} stroke={BRANCO} strokeWidth={6} />
      <ellipse cx={1330} cy={510} rx={20} ry={95} fill={BRANCO} opacity={0.9} />
      {/* manivela girando */}
      <circle cx={960} cy={510} r={24} fill={SEPIA} stroke={BRANCO} strokeWidth={4} />
      <line x1={960} y1={510} x2={mx} y2={my} stroke={BRANCO} strokeWidth={14} strokeLinecap="round" />
      <circle cx={mx} cy={my} r={18} fill={SEPIA} stroke={BRANCO} strokeWidth={4} />
      {/* coração */}
      {f >= 120 && (
        <g transform={`translate(${hx} ${hy}) scale(${(0.15 + t * 0.95) * batida})`}>
          {f > 170 &&
            [0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
              const a = (i * Math.PI) / 4;
              const pisca = Math.floor(g / 6) % 2 ? 1 : 0.4;
              return <line key={i} x1={160 * Math.cos(a)} y1={160 * Math.sin(a) - 10} x2={200 * Math.cos(a)} y2={200 * Math.sin(a) - 10} stroke={BRANCO} strokeWidth={10} strokeLinecap="round" opacity={pisca} />;
            })}
          <Coracao cor={BRANCO} contorno={PRETO} />
        </g>
      )}
    </svg>
  );
};
