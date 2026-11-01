import React from 'react';
import {BRANCO, CINZA, PRETO, SEPIA, degrau, lerp} from '../estilo';
import {Easing, random} from 'remotion';

type Predio = {x: number; w: number; h: number; tipo: 'casa' | 'reto' | 'torre' | 'cupula'};

const PREDIOS: Predio[] = [
  {x: 60, w: 210, h: 330, tipo: 'casa'},
  {x: 290, w: 170, h: 430, tipo: 'reto'},
  {x: 480, w: 240, h: 300, tipo: 'casa'},
  {x: 740, w: 200, h: 470, tipo: 'cupula'},
  {x: 960, w: 180, h: 360, tipo: 'casa'},
  {x: 1170, w: 120, h: 660, tipo: 'torre'},
  {x: 1320, w: 230, h: 320, tipo: 'casa'},
  {x: 1570, w: 160, h: 420, tipo: 'reto'},
  {x: 1750, w: 200, h: 300, tipo: 'casa'},
];

const CHAO = 900;

const Predio: React.FC<{p: Predio; i: number; f: number}> = ({p, i, f}) => {
  const inicio = 8 + i * 13;
  const sobe = lerp(degrau(f, 2), [inicio, inicio + 18], [p.h + 260, 0], Easing.out(Easing.back(1.3)));
  const topo = CHAO - p.h;
  const janelas: React.ReactNode[] = [];
  const cols = Math.max(2, Math.floor(p.w / 60));
  const linhas = Math.floor((p.h - 90) / 80);
  if (p.tipo !== 'torre') {
    for (let r = 0; r < linhas; r++) {
      for (let c = 0; c < cols; c++) {
        const acesa = random(`j${i}-${r}-${c}`) < 0.55;
        const wx = p.x + ((c + 0.5) * p.w) / cols - 13;
        const wy = topo + 60 + r * 80;
        janelas.push(
          <rect key={`${r}-${c}`} x={wx} y={wy} width={26} height={40} fill={acesa ? SEPIA : CINZA} opacity={acesa ? 1 : 0.6} />,
        );
      }
    }
  }
  let telhado: React.ReactNode = null;
  if (p.tipo === 'casa') {
    telhado = (
      <>
        <polygon points={`${p.x - 12},${topo} ${p.x + p.w / 2},${topo - 110} ${p.x + p.w + 12},${topo}`} fill={PRETO} />
        <rect x={p.x + p.w * 0.68} y={topo - 120} width={26} height={80} fill={PRETO} />
        <rect x={p.x + p.w * 0.68 - 6} y={topo - 128} width={38} height={14} fill={PRETO} />
      </>
    );
  } else if (p.tipo === 'reto') {
    telhado = (
      <>
        <rect x={p.x - 8} y={topo - 14} width={p.w + 16} height={18} fill={PRETO} />
        <rect x={p.x + 20} y={topo - 70} width={22} height={60} fill={PRETO} />
        <rect x={p.x + 56} y={topo - 56} width={22} height={46} fill={PRETO} />
      </>
    );
  } else if (p.tipo === 'cupula') {
    telhado = (
      <>
        <path d={`M ${p.x + 20} ${topo} A ${p.w / 2 - 20} ${p.w / 2 - 20} 0 0 1 ${p.x + p.w - 20} ${topo} Z`} fill={PRETO} />
        <rect x={p.x + p.w / 2 - 6} y={topo - p.w / 2 - 40} width={12} height={50} fill={PRETO} />
      </>
    );
  } else {
    // torre do relógio
    const cx = p.x + p.w / 2;
    telhado = (
      <>
        <rect x={p.x - 14} y={topo + 40} width={p.w + 28} height={170} fill={PRETO} />
        <circle cx={cx} cy={topo + 125} r={46} fill={BRANCO} />
        <circle cx={cx} cy={topo + 125} r={46} fill="none" stroke={SEPIA} strokeWidth={5} />
        <line x1={cx} y1={topo + 125} x2={cx} y2={topo + 92} stroke={PRETO} strokeWidth={6} />
        <line x1={cx} y1={topo + 125} x2={cx + 24} y2={topo + 135} stroke={PRETO} strokeWidth={6} />
        <polygon points={`${p.x - 14},${topo + 40} ${cx},${topo - 150} ${p.x + p.w + 14},${topo + 40}`} fill={PRETO} />
        <rect x={cx - 4} y={topo - 200} width={8} height={60} fill={PRETO} />
        {[0, 1, 2, 3, 4].map((k) => (
          <rect key={k} x={cx - 8} y={topo + 260 + k * 70} width={16} height={36} fill={SEPIA} opacity={0.8} />
        ))}
      </>
    );
  }
  return (
    <g transform={`translate(0 ${sobe})`}>
      {telhado}
      <rect x={p.x} y={topo} width={p.w} height={p.h + 2} fill={PRETO} />
      {janelas}
    </g>
  );
};

const Lampiao: React.FC<{x: number; f: number; inicio: number}> = ({x, f, inicio}) => {
  const ligado = f > inicio + 10 && !(f > inicio + 14 && f < inicio + 18);
  const sobe = lerp(degrau(f, 2), [inicio, inicio + 10], [520, 0]);
  return (
    <g transform={`translate(0 ${sobe})`}>
      {ligado && <circle cx={x} cy={CHAO - 268} r={70} fill={BRANCO} opacity={0.16} />}
      <rect x={x - 7} y={CHAO - 240} width={14} height={300} fill={PRETO} stroke={SEPIA} strokeWidth={3} />
      <rect x={x - 22} y={CHAO + 40} width={44} height={30} fill={PRETO} />
      <path d={`M ${x - 26} ${CHAO - 240} L ${x + 26} ${CHAO - 240} L ${x + 34} ${CHAO - 300} L ${x - 34} ${CHAO - 300} Z`} fill={ligado ? BRANCO : CINZA} stroke={PRETO} strokeWidth={6} />
      <path d={`M ${x - 40} ${CHAO - 300} L ${x + 40} ${CHAO - 300} L ${x} ${CHAO - 330} Z`} fill={PRETO} />
      <line x1={x - 30} y1={CHAO - 200} x2={x + 30} y2={CHAO - 200} stroke={PRETO} strokeWidth={8} />
    </g>
  );
};

export const Londres: React.FC<{f: number}> = ({f}) => {
  const neblina = [
    {y: 760, h: 70, v: 2.2, o: 0.2, w: 900},
    {y: 830, h: 90, v: -1.6, o: 0.16, w: 1100},
    {y: 700, h: 50, v: 1.2, o: 0.12, w: 700},
  ];
  return (
    <svg viewBox="0 0 1920 1080" width={1920} height={1080}>
      <rect width={1920} height={1080} fill={CINZA} />
      <circle cx={1600} cy={190} r={80} fill={BRANCO} />
      {[...Array(14)].map((_, i) => (
        <circle key={i} cx={random(`ex${i}`) * 1920} cy={random(`ey${i}`) * 330 + 30} r={3} fill={BRANCO} opacity={(Math.floor(f / 8) + i) % 3 === 0 ? 0.4 : 0.9} />
      ))}
      {PREDIOS.map((p, i) => (
        <Predio key={i} p={p} i={i} f={f} />
      ))}
      {neblina.map((n, i) => {
        const x = ((((f * n.v + i * 600) % 2800) + 2800) % 2800) - 900;
        return (
          <g key={i} opacity={n.o}>
            <rect x={x} y={n.y} width={n.w} height={n.h} rx={n.h / 2} fill={BRANCO} />
            <rect x={x + n.w * 0.3} y={n.y - n.h * 0.4} width={n.w * 0.5} height={n.h} rx={n.h / 2} fill={BRANCO} />
          </g>
        );
      })}
      <rect x={0} y={CHAO} width={1920} height={180} fill={PRETO} />
      <line x1={0} y1={CHAO + 4} x2={1920} y2={CHAO + 4} stroke={SEPIA} strokeWidth={4} />
      {[180, 640, 1100, 1560].map((x, i) => (
        <Lampiao key={x} x={x + 100} f={f} inicio={130 + i * 12} />
      ))}
    </svg>
  );
};
