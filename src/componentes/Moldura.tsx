import React from 'react';
import {BRANCO, SEPIA} from '../estilo';

/** Canto art déco (desenhado para o canto superior esquerdo). */
const Canto: React.FC<{transform?: string}> = ({transform}) => (
  <g transform={transform} fill="none" stroke={SEPIA} strokeLinecap="square">
    {/* degraus em L */}
    <path d="M 96 200 L 96 96 L 200 96" strokeWidth={3} />
    <path d="M 112 170 L 112 112 L 170 112" strokeWidth={2} />
    <path d="M 128 146 L 128 128 L 146 128" strokeWidth={2} />
    {/* leque de canto: arcos concêntricos */}
    <path d="M 60 150 A 90 90 0 0 0 150 60" strokeWidth={2} />
    <path d="M 60 120 A 60 60 0 0 0 120 60" strokeWidth={2} />
    {/* raios */}
    {[0, 22.5, 45, 67.5, 90].map((a) => {
      const r = (a * Math.PI) / 180;
      return (
        <line
          key={a}
          x1={60 + 60 * Math.cos(r)}
          y1={60 + 60 * Math.sin(r)}
          x2={60 + 90 * Math.cos(r)}
          y2={60 + 90 * Math.sin(r)}
          strokeWidth={2}
        />
      );
    })}
    {/* losango */}
    <path d="M 150 150 l 10 -10 l 10 10 l -10 10 Z" fill={BRANCO} stroke="none" />
    {/* linhas que correm pelas bordas */}
    <line x1={220} y1={96} x2={300} y2={96} strokeWidth={3} />
    <line x1={96} y1={220} x2={96} y2={300} strokeWidth={3} />
  </g>
);

/** Leque geométrico do topo, centrado em (960, y). */
const Leque: React.FC<{y: number}> = ({y}) => {
  const raios = [];
  for (let a = 0; a <= 180; a += 15) {
    const r = (a * Math.PI) / 180;
    raios.push(
      <line
        key={a}
        x1={960 + 34 * Math.cos(r)}
        y1={y + 34 * Math.sin(r)}
        x2={960 + 112 * Math.cos(r)}
        y2={y + 112 * Math.sin(r)}
        stroke={SEPIA}
        strokeWidth={2.5}
      />,
    );
  }
  return (
    <g>
      {/* apaga a linha da borda atrás do leque */}
      <rect x={830} y={y - 26} width={260} height={30} fill="#0d0d0d" />
      <path
        d={`M ${960 - 124} ${y} A 124 124 0 0 0 ${960 + 124} ${y}`}
        fill="#0d0d0d"
        stroke={SEPIA}
        strokeWidth={3}
      />
      <path
        d={`M ${960 - 112} ${y} A 112 112 0 0 0 ${960 + 112} ${y}`}
        fill="none"
        stroke={SEPIA}
        strokeWidth={1.5}
      />
      {raios}
      <path
        d={`M ${960 - 26} ${y} A 26 26 0 0 0 ${960 + 26} ${y} Z`}
        fill={BRANCO}
      />
      {/* degraus acima do leque */}
      <path
        d={`M ${960 - 150} ${y - 16} L ${960 - 130} ${y - 16} L ${960 - 130} ${y}`}
        fill="none"
        stroke={SEPIA}
        strokeWidth={2.5}
      />
      <path
        d={`M ${960 + 150} ${y - 16} L ${960 + 130} ${y - 16} L ${960 + 130} ${y}`}
        fill="none"
        stroke={SEPIA}
        strokeWidth={2.5}
      />
      <line x1={960 - 150} y1={y} x2={960 + 150} y2={y} stroke={SEPIA} strokeWidth={3} />
    </g>
  );
};

/** Ornamento do rodapé, centrado em (960, y). */
const Rodape: React.FC<{y: number}> = ({y}) => (
  <g stroke={SEPIA} fill="none" strokeWidth={2.5}>
    <rect x={900} y={y - 14} width={120} height={28} fill="#0d0d0d" stroke="none" />
    <path d={`M 930 ${y} l 30 -16 l 30 16 l -30 16 Z`} fill="#0d0d0d" />
    <path d={`M 948 ${y} l 12 -7 l 12 7 l -12 7 Z`} fill={BRANCO} stroke="none" />
    <line x1={890} y1={y} x2={922} y2={y} />
    <line x1={998} y1={y} x2={1030} y2={y} />
  </g>
);

/** Losango lateral, centrado em (x, 540). */
const Lateral: React.FC<{x: number}> = ({x}) => (
  <g>
    <rect x={x - 14} y={500} width={28} height={80} fill="#0d0d0d" />
    <path d={`M ${x} 510 l 12 30 l -12 30 l -12 -30 Z`} fill="none" stroke={SEPIA} strokeWidth={2.5} />
    <path d={`M ${x} 528 l 5 12 l -5 12 l -5 -12 Z`} fill={BRANCO} />
  </g>
);

/**
 * Moldura art déco em tela cheia (1920x1080): linhas duplas,
 * cantos ornamentados e leque no topo.
 */
export const Moldura: React.FC = () => (
  <svg
    viewBox="0 0 1920 1080"
    width={1920}
    height={1080}
    style={{position: 'absolute', inset: 0}}
  >
    {/* linhas duplas */}
    <rect x={60} y={50} width={1800} height={980} fill="none" stroke={SEPIA} strokeWidth={4} />
    <rect x={78} y={68} width={1764} height={944} fill="none" stroke={SEPIA} strokeWidth={1.5} />
    <Canto />
    <Canto transform="translate(1920 0) scale(-1 1)" />
    <Canto transform="translate(0 1080) scale(1 -1)" />
    <Canto transform="translate(1920 1080) scale(-1 -1)" />
    <Leque y={68} />
    <Rodape y={1012} />
    <Lateral x={78} />
    <Lateral x={1842} />
  </svg>
);

/** Pequeno ornamento separador sob o texto. */
export const Separador: React.FC = () => (
  <svg width={360} height={30} viewBox="0 0 360 30">
    <line x1={0} y1={15} x2={150} y2={15} stroke={SEPIA} strokeWidth={2} />
    <line x1={210} y1={15} x2={360} y2={15} stroke={SEPIA} strokeWidth={2} />
    <path d="M 180 3 l 12 12 l -12 12 l -12 -12 Z" fill="none" stroke={SEPIA} strokeWidth={2} />
    <path d="M 180 10 l 5 5 l -5 5 l -5 -5 Z" fill={BRANCO} />
  </svg>
);
