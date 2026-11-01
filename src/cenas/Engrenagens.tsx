import React from 'react';
import {random} from 'remotion';
import {Bengala, ChapeuCoco, Nota, caminhoEngrenagem} from '../componentes/Formas';
import {BRANCO, CINZA, FONTE_TITULO, PRETO, SEPIA, degrau} from '../estilo';

const PASSO = 128; // mesmo tamanho de dente em todas, para encaixarem
const raio = (n: number) => (n * PASSO) / (Math.PI * 2);

type G = {n: number; x: number; y: number; r: number; fase: number; vel: number};

const montar = (): G[] => {
  const A = {n: 16, x: 720, y: 540, r: raio(16)};
  const B0 = {n: 10, r: raio(10)};
  const C0 = {n: 8, r: raio(8)};
  const phiAB = (-25 * Math.PI) / 180;
  const phiBC = (50 * Math.PI) / 180;
  const B = {...B0, x: A.x + (A.r + B0.r) * Math.cos(phiAB), y: A.y + (A.r + B0.r) * Math.sin(phiAB)};
  const C = {...C0, x: B.x + (B.r + C0.r) * Math.cos(phiBC), y: B.y + (B.r + C0.r) * Math.sin(phiBC)};
  const faseA = phiAB;
  const faseB = phiAB + Math.PI - Math.PI / B.n;
  const passoB = (Math.PI * 2) / B.n;
  const u = ((((phiBC - faseB) / passoB) % 1) + 1) % 1;
  const faseC = phiBC + Math.PI + (u - 0.5) * ((Math.PI * 2) / C.n);
  return [
    {...A, fase: faseA, vel: 1},
    {...B, fase: faseB, vel: -A.n / B.n},
    {...C, fase: faseC, vel: A.n / C.n},
  ];
};
const GEARS = montar();

const Engrenagem: React.FC<{e: G; ang: number}> = ({e, ang}) => (
  <g transform={`translate(${e.x} ${e.y}) rotate(${(ang * 180) / Math.PI})`}>
    <path d={caminhoEngrenagem(e.n, e.r)} fill={CINZA} stroke={SEPIA} strokeWidth={6} strokeLinejoin="round" />
    <circle r={e.r * 0.72} fill="none" stroke={SEPIA} strokeWidth={4} />
    {[0, 1, 2, 3, 4].map((i) => {
      const a = (i * Math.PI * 2) / 5;
      return <circle key={i} cx={e.r * 0.45 * Math.cos(a)} cy={e.r * 0.45 * Math.sin(a)} r={e.r * 0.14} fill={PRETO} stroke={SEPIA} strokeWidth={3} />;
    })}
    <circle r={e.r * 0.13} fill={PRETO} stroke={BRANCO} strokeWidth={5} />
  </g>
);

const LETRAS = 'ABCDEFGHIJLMNOPQRSTUVXZ';

export const Engrenagens: React.FC<{f: number}> = ({f}) => {
  const g = degrau(f, 2);
  const w = (g * 1.1 * Math.PI) / 180;

  // chapéu e bengala atravessando por baixo/entre as engrenagens (0–8 s)
  const hx = -200 + (g / 240) * 2300;
  const hy = 960 - 110 * Math.exp(-(((hx - 1150) / 300) ** 2)) - Math.abs(Math.sin(g / 7)) * 30;

  const voadores: React.ReactNode[] = [];
  if (f >= 135) {
    for (let k = 0; k < 22; k++) {
      const nasce = 135 + k * 4;
      const t = (g - nasce) / 60;
      if (t < 0 || t > 1) continue;
      const ox = -200 + (nasce / 240) * 2300;
      const x = ox - 60 + random(`lx${k}`) * 120 + Math.sin(t * 6 + k) * 40;
      const y = 800 - t * (420 + random(`ly${k}`) * 260);
      const rot = (random(`lr${k}`) - 0.5) * 80 + t * (k % 2 ? 120 : -120);
      const op = t > 0.8 ? (1 - t) * 5 : 1;
      if (k % 2 === 0) {
        voadores.push(
          <g key={k} transform={`translate(${x} ${y}) rotate(${rot / 3})`} opacity={op}>
            <Nota cor={k % 4 ? SEPIA : BRANCO} dupla={k % 3 === 0} />
          </g>,
        );
      } else {
        const letra = LETRAS[Math.floor(random(`lt${k}`) * LETRAS.length)];
        voadores.push(
          <text key={k} x={x} y={y} transform={`rotate(${rot} ${x} ${y})`} textAnchor="middle" fontFamily={FONTE_TITULO} fontSize={92} fill={BRANCO} opacity={op}>
            {letra}
          </text>,
        );
      }
    }
  }

  return (
    <svg viewBox="0 0 1920 1080" width={1920} height={1080}>
      <rect width={1920} height={1080} fill={PRETO} />
      {GEARS.map((e, i) => (
        <Engrenagem key={i} e={e} ang={e.fase + w * e.vel} />
      ))}
      <g transform={`translate(${hx + 150} ${hy - 60}) rotate(${g * 14})`}>
        <g transform="translate(34 -170)">
          <Bengala c={340} cor={BRANCO} largura={14} />
        </g>
      </g>
      <g transform={`translate(${hx} ${hy}) rotate(${Math.sin(g / 6) * 10})`}>
        <ChapeuCoco cor={PRETO} contorno={BRANCO} detalhe={CINZA} />
      </g>
      {voadores}
    </svg>
  );
};
