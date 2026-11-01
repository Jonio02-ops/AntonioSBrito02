import React from 'react';
import {PRETO} from '../estilo';

/** Máscara de íris: tudo preto, menos um círculo de raio r em (cx, cy). */
export const Iris: React.FC<{r: number; cx?: number; cy?: number}> = ({
  r,
  cx = 960,
  cy = 540,
}) => {
  if (r >= 1110) return null;
  const raio = Math.max(0, r);
  return (
    <svg
      viewBox="0 0 1920 1080"
      width={1920}
      height={1080}
      style={{position: 'absolute', inset: 0}}
    >
      <path
        fillRule="evenodd"
        fill={PRETO}
        d={`M -10 -10 H 1930 V 1090 H -10 Z M ${cx - raio} ${cy} a ${raio} ${raio} 0 1 0 ${2 * raio} 0 a ${raio} ${raio} 0 1 0 ${-2 * raio} 0 Z`}
      />
    </svg>
  );
};
