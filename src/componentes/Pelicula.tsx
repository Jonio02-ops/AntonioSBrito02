import React from 'react';
import {AbsoluteFill, random, useCurrentFrame} from 'remotion';
import {BRANCO, PRETO} from '../estilo';

/**
 * Camada de "película antiga": tremor do quadro e flicker (aplicados ao
 * conteúdo), grão animado, arranhões, poeira e vinheta (por cima de tudo).
 */
export const Pelicula: React.FC<{children: React.ReactNode}> = ({children}) => {
  const frame = useCurrentFrame();

  // tremor leve do quadro (1–2 px)
  const dx = (random(`tx${frame}`) - 0.5) * 3;
  const dy = (random(`ty${frame}`) - 0.5) * 3;
  // flicker de brilho ±4%
  const brilho = 1 + (random(`fl${frame}`) - 0.5) * 0.08;

  // arranhões verticais: duram alguns frames, aparecem ao acaso
  const bloco = Math.floor(frame / 3);
  const arranhoes: React.ReactNode[] = [];
  for (let i = 0; i < 3; i++) {
    if (random(`ar${bloco}-${i}`) < 0.32) {
      const x = random(`ax${bloco}-${i}`) * 1920 + (random(`aj${frame}-${i}`) - 0.5) * 6;
      const y0 = random(`ay${bloco}-${i}`) * 500 - 200;
      const alt = 500 + random(`ah${bloco}-${i}`) * 900;
      const claro = random(`ac${bloco}-${i}`) < 0.6;
      arranhoes.push(
        <line
          key={i}
          x1={x}
          y1={y0}
          x2={x + (random(`ad${bloco}-${i}`) - 0.5) * 8}
          y2={y0 + alt}
          stroke={claro ? BRANCO : PRETO}
          strokeWidth={random(`aw${bloco}-${i}`) < 0.5 ? 1 : 2}
          opacity={claro ? 0.35 : 0.5}
        />,
      );
    }
  }

  // poeira / fiapos: um frame só
  const poeira: React.ReactNode[] = [];
  for (let i = 0; i < 4; i++) {
    if (random(`po${frame}-${i}`) < 0.18) {
      const x = random(`px${frame}-${i}`) * 1920;
      const y = random(`py${frame}-${i}`) * 1080;
      const claro = random(`pc${frame}-${i}`) < 0.5;
      const cor = claro ? BRANCO : PRETO;
      if (random(`pt${frame}-${i}`) < 0.6) {
        poeira.push(
          <circle key={i} cx={x} cy={y} r={2 + random(`pr${frame}-${i}`) * 4} fill={cor} opacity={0.6} />,
        );
      } else {
        poeira.push(
          <path
            key={i}
            d={`M ${x} ${y} q ${20 + random(`q1${frame}`) * 30} ${-20} ${40} ${random(`q2${frame}`) * 40 - 20} t 30 10`}
            stroke={cor}
            strokeWidth={1.5}
            fill="none"
            opacity={0.55}
          />,
        );
      }
    }
  }

  return (
    <AbsoluteFill style={{background: PRETO, overflow: 'hidden'}}>
      <AbsoluteFill
        style={{
          transform: `translate(${dx}px, ${dy}px)`,
          filter: `brightness(${brilho.toFixed(3)})`,
        }}
      >
        {children}
      </AbsoluteFill>

      {/* grão: feTurbulence com seed nova a cada frame */}
      <svg
        viewBox="0 0 960 540"
        width={1920}
        height={1080}
        style={{position: 'absolute', inset: 0}}
        preserveAspectRatio="none"
      >
        <filter id={`grao-claro-${frame}`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} seed={frame} stitchTiles="stitch" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.949  0 0 0 0 0.918  0 0 0 0 0.847  2.2 0 0 0 -1.25"
          />
        </filter>
        <filter id={`grao-escuro-${frame}`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves={2} seed={frame + 777} stitchTiles="stitch" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.051  0 0 0 0 0.051  0 0 0 0 0.051  0 2.2 0 0 -1.2"
          />
        </filter>
        <rect width={960} height={540} filter={`url(#grao-claro-${frame})`} opacity={0.32} />
        <rect width={960} height={540} filter={`url(#grao-escuro-${frame})`} opacity={0.4} />
      </svg>

      <svg viewBox="0 0 1920 1080" width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        {arranhoes}
        {poeira}
      </svg>

      {/* vinheta escura nas bordas */}
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse 75% 75% at 50% 50%, rgba(13,13,13,0) 60%, rgba(13,13,13,0.55) 85%, rgba(13,13,13,0.92) 100%)',
        }}
      />
    </AbsoluteFill>
  );
};
