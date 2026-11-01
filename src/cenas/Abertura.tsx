import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Iris} from '../componentes/Iris';
import {Bengala, ChapeuCoco} from '../componentes/Formas';
import {BRANCO, CINZA, FONTE_TITULO, PRETO, SEPIA, degrau, lerp} from '../estilo';

const C = {x: 960, y: 540};

/** Contagem regressiva de película (3-2-1) com ponteiro girando. */
const Contagem: React.FC<{f: number}> = ({f}) => {
  const n = 3 - Math.floor(f / 30);
  const p = (f % 30) / 30;
  const ang = -Math.PI / 2 + p * Math.PI * 2;
  const R = 1300;
  const fx = C.x + R * Math.cos(ang);
  const fy = C.y + R * Math.sin(ang);
  const grande = p > 0.5 ? 1 : 0;
  const setor =
    p <= 0
      ? ''
      : `M ${C.x} ${C.y} L ${C.x} ${C.y - R} A ${R} ${R} 0 ${grande} 1 ${fx} ${fy} Z`;
  const flash = f % 30 >= 28;
  return (
    <svg viewBox="0 0 1920 1080" width={1920} height={1080}>
      <rect width={1920} height={1080} fill={SEPIA} />
      <path d={setor} fill={CINZA} />
      <line x1={0} y1={C.y} x2={1920} y2={C.y} stroke={PRETO} strokeWidth={5} />
      <line x1={C.x} y1={0} x2={C.x} y2={1080} stroke={PRETO} strokeWidth={5} />
      <circle cx={C.x} cy={C.y} r={430} fill="none" stroke={BRANCO} strokeWidth={10} />
      <circle cx={C.x} cy={C.y} r={385} fill="none" stroke={BRANCO} strokeWidth={4} />
      <line x1={C.x} y1={C.y} x2={fx} y2={fy} stroke={PRETO} strokeWidth={8} />
      <text
        x={C.x}
        y={C.y + 165}
        textAnchor="middle"
        fontFamily={FONTE_TITULO}
        fontSize={520}
        fill={PRETO}
      >
        {n}
      </text>
      {flash && <rect width={1920} height={1080} fill={BRANCO} opacity={0.85} />}
    </svg>
  );
};

/** Projetor de cinema lançando luz numa telinha. */
const Projetor: React.FC<{f: number}> = ({f}) => {
  const g = degrau(f, 2);
  const giro = g * 9;
  const luz = 0.12 + (Math.floor(g / 2) % 3) * 0.015;
  const raios = (cx: number, cy: number, r: number) =>
    [0, 60, 120, 180, 240, 300].map((a) => {
      const t = ((a + giro) * Math.PI) / 180;
      return (
        <line
          key={a}
          x1={cx}
          y1={cy}
          x2={cx + r * Math.cos(t)}
          y2={cy + r * Math.sin(t)}
          stroke={SEPIA}
          strokeWidth={8}
        />
      );
    });
  return (
    <svg viewBox="0 0 1920 1080" width={1920} height={1080}>
      <rect width={1920} height={1080} fill={PRETO} />
      {/* feixe */}
      <polygon points="640,590 640,650 1420,250 1420,930" fill={BRANCO} opacity={luz} />
      {/* tela */}
      <rect x={1420} y={250} width={400} height={680} fill={BRANCO} />
      <rect x={1410} y={240} width={420} height={700} fill="none" stroke={SEPIA} strokeWidth={8} />
      <g transform="translate(1620 520) scale(0.9)">
        <ChapeuCoco />
      </g>
      <g transform="translate(1690 560) rotate(12)">
        <Bengala c={300} cor={PRETO} largura={14} />
      </g>
      {/* projetor */}
      <g>
        <circle cx={330} cy={430} r={100} fill={PRETO} stroke={SEPIA} strokeWidth={10} />
        {raios(330, 430, 92)}
        <circle cx={330} cy={430} r={18} fill={SEPIA} />
        <circle cx={520} cy={450} r={82} fill={PRETO} stroke={SEPIA} strokeWidth={10} />
        {raios(520, 450, 74)}
        <circle cx={520} cy={450} r={16} fill={SEPIA} />
        <rect x={240} y={520} width={360} height={200} rx={14} fill={CINZA} stroke={SEPIA} strokeWidth={6} />
        <rect x={600} y={575} width={60} height={90} fill={CINZA} stroke={SEPIA} strokeWidth={6} />
        <circle cx={300} cy={620} r={30} fill={PRETO} stroke={SEPIA} strokeWidth={6} />
        <line x1={300} y1={620} x2={300 + 26 * Math.cos(giro / 20)} y2={620 + 26 * Math.sin(giro / 20)} stroke={BRANCO} strokeWidth={6} />
        <path d="M 330 720 L 260 960 M 510 720 L 580 960 M 420 720 L 420 960" stroke={SEPIA} strokeWidth={14} strokeLinecap="round" />
      </g>
    </svg>
  );
};

export const Abertura: React.FC<{f: number}> = ({f}) => {
  if (f < 90) return <Contagem f={f} />;
  if (f < 105) return <AbsoluteFill style={{background: PRETO}} />;
  const r = lerp(degrau(f, 2), [105, 150], [0, 1150]);
  return (
    <AbsoluteFill>
      <Projetor f={f - 105} />
      <Iris r={r} cx={960} cy={560} />
    </AbsoluteFill>
  );
};
