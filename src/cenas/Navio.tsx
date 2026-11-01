import React from 'react';
import {BRANCO, CINZA, PRETO, SEPIA, degrau, lerp} from '../estilo';

const onda = (y: number, amp: number, comp: number, fase: number) => {
  let d = `M -100 1100 L -100 ${y}`;
  for (let x = -100; x <= 2020; x += 20) {
    d += ` L ${x} ${(y + amp * Math.sin((x / comp) * Math.PI * 2 + fase)).toFixed(1)}`;
  }
  return d + ' L 2020 1100 Z';
};

const Navio: React.FC = () => (
  <g>
    {/* chaminés */}
    <rect x={-40} y={-260} width={60} height={150} fill={PRETO} />
    <rect x={-40} y={-240} width={60} height={22} fill={SEPIA} />
    <rect x={90} y={-250} width={60} height={140} fill={PRETO} />
    <rect x={90} y={-230} width={60} height={22} fill={SEPIA} />
    {/* mastros */}
    <line x1={-230} y1={-110} x2={-230} y2={-330} stroke={PRETO} strokeWidth={8} />
    <line x1={290} y1={-110} x2={290} y2={-310} stroke={PRETO} strokeWidth={8} />
    <path d="M -230 -320 L -360 -60 M -230 -320 L -100 -110 M 290 -300 L 420 -60" stroke={PRETO} strokeWidth={3} />
    {/* cabine */}
    <rect x={-170} y={-120} width={380} height={70} fill={PRETO} />
    {[...Array(7)].map((_, i) => (
      <circle key={i} cx={-140 + i * 54} cy={-85} r={11} fill={BRANCO} />
    ))}
    {/* casco */}
    <path d="M -380 -60 L 420 -60 L 360 70 L -320 70 Z" fill={PRETO} />
    <rect x={-360} y={-30} width={760} height={10} fill={SEPIA} />
    {[...Array(10)].map((_, i) => (
      <circle key={i} cx={-270 + i * 66} cy={10} r={9} fill={SEPIA} />
    ))}
  </g>
);

const Liberdade: React.FC = () => (
  <g fill={PRETO}>
    <rect x={-50} y={-40} width={100} height={40} />
    <rect x={-35} y={-120} width={70} height={80} />
    <path d="M -24 -120 L -18 -230 L 18 -230 L 24 -120 Z" />
    <circle cx={0} cy={-246} r={16} />
    <path d="M -16 -262 l -10 -18 M 0 -264 l 0 -22 M 16 -262 l 10 -18" stroke={PRETO} strokeWidth={5} />
    <path d="M 12 -220 L 30 -300" stroke={PRETO} strokeWidth={12} strokeLinecap="round" />
    <path d="M 20 -300 L 40 -300 L 34 -318 L 26 -318 Z" />
    <path d="M 30 -324 q -8 -12 0 -22 q 8 10 0 22 Z" fill={BRANCO} />
  </g>
);

export const NavioCena: React.FC<{f: number}> = ({f}) => {
  const g = degrau(f, 2);
  const x = lerp(f, [0, 225], [-520, 2300]);
  const y = 720 + Math.sin(g / 9) * 10;
  const rot = Math.sin(g / 11) * 2.2;
  const fumaca = [...Array(9)].map((_, i) => {
    const ciclo = 54;
    const t = ((g + i * 6) % ciclo) / ciclo;
    const k = Math.floor((g + i * 6) / ciclo);
    const nascX = x + (i % 2 ? 120 : -10);
    const px = nascX - t * 320 - (i % 3) * 20;
    const py = y - 270 - t * 230 - (k % 2) * 10;
    return <circle key={i} cx={px} cy={py} r={22 + t * 60} fill={CINZA} opacity={(1 - t) * 0.9} />;
  });
  return (
    <svg viewBox="0 0 1920 1080" width={1920} height={1080}>
      <rect width={1920} height={1080} fill={SEPIA} />
      <circle cx={360} cy={230} r={110} fill={BRANCO} />
      {[0, 1, 2].map((i) => {
        const gx = ((g * 3 + i * 500) % 2400) - 200;
        const gy = 200 + i * 70 + Math.sin(g / 5 + i) * 10;
        const asa = Math.floor(g / 6 + i) % 2 ? 14 : -6;
        return <path key={i} d={`M ${gx - 30} ${gy + asa} Q ${gx - 14} ${gy - 10} ${gx} ${gy} Q ${gx + 14} ${gy - 10} ${gx + 30} ${gy + asa}`} stroke={PRETO} strokeWidth={5} fill="none" />;
      })}
      <g transform={`translate(1700 690)`} opacity={lerp(f, [100, 150], [0, 1])}>
        <Liberdade />
      </g>
      <path d={onda(700, 10, 360, g / 8)} fill={CINZA} />
      {fumaca}
      <g transform={`translate(${x} ${y}) rotate(${rot})`}>
        <Navio />
      </g>
      <path d={onda(770, 18, 300, -g / 6)} fill={PRETO} />
      <path d={onda(860, 22, 420, g / 5 + 1)} fill={CINZA} />
      <path d={onda(960, 26, 340, -g / 4 + 2)} fill={PRETO} />
      {[0, 1, 2, 3, 4].map((i) => {
        const cx = ((i * 430 + g * 4) % 2100) - 90;
        return <path key={i} d={`M ${cx} ${900 + (i % 2) * 70} q 30 -24 60 0`} stroke={SEPIA} strokeWidth={5} fill="none" />;
      })}
    </svg>
  );
};
