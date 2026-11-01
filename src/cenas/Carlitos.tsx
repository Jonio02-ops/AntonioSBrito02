import React from 'react';
import {Bengala, Bigodinho, ChapeuCoco, Sapatao} from '../componentes/Formas';
import {BRANCO, CINZA, PRETO, SEPIA, degrau, lerp, queda} from '../estilo';

/** Peça que cai do alto e se encaixa em `pouso` (frame), com quiquezinho. */
const Cai: React.FC<{f: number; pouso: number; children: React.ReactNode}> = ({f, pouso, children}) => {
  const g = degrau(f, 2);
  if (g < pouso - 20) return null;
  let dy = lerp(g, [pouso - 20, pouso], [-1000, 0], queda);
  if (g > pouso && g < pouso + 10) dy = -Math.sin(((g - pouso) / 10) * Math.PI) * 26;
  return <g transform={`translate(0 ${dy})`}>{children}</g>;
};

export const Carlitos: React.FC<{f: number}> = ({f}) => {
  const g = degrau(f, 2);
  const tip = g >= 228 && g < 256;
  return (
    <svg viewBox="0 0 1920 1080" width={1920} height={1080}>
      <rect width={1920} height={1080} fill={PRETO} />
      {/* manequim */}
      <g stroke={CINZA} fill="none" strokeWidth={5}>
        <path d="M 860 360 L 1060 360 L 1030 520 L 1045 600 L 875 600 L 890 520 Z" strokeDasharray="14 10" />
        <line x1={960} y1={600} x2={960} y2={950} strokeWidth={12} />
        <path d="M 960 950 L 860 990 M 960 950 L 1060 990 M 960 950 L 960 995" strokeWidth={10} />
      </g>
      <rect x={944} y={318} width={32} height={46} fill={CINZA} />
      <ellipse cx={960} cy={250} rx={62} ry={80} fill={SEPIA} />
      <line x1={760} y1={1000} x2={1160} y2={1000} stroke={CINZA} strokeWidth={4} />

      {/* calça larga (fica por baixo do casaco) */}
      <Cai f={f} pouso={96}>
        <path d="M 880 585 L 1040 585 L 1085 885 L 978 885 L 960 690 L 942 885 L 835 885 Z" fill={CINZA} stroke={BRANCO} strokeWidth={4} strokeLinejoin="round" />
        <path d="M 880 700 q 20 40 0 90 M 1040 700 q -20 40 0 90 M 905 820 q 15 20 5 60 M 1015 820 q -15 20 -5 60" stroke={PRETO} strokeWidth={5} fill="none" />
      </Cai>
      {/* casaco apertado */}
      <Cai f={f} pouso={60}>
        <path d="M 860 362 L 820 380 L 800 590 L 842 596 L 872 430 Z" fill={PRETO} stroke={BRANCO} strokeWidth={4} strokeLinejoin="round" />
        <path d="M 1060 362 L 1100 380 L 1120 590 L 1078 596 L 1048 430 Z" fill={PRETO} stroke={BRANCO} strokeWidth={4} strokeLinejoin="round" />
        <path d="M 860 360 L 1060 360 L 1050 420 L 1030 520 L 1045 605 L 875 605 L 890 520 L 870 420 Z" fill={PRETO} stroke={BRANCO} strokeWidth={4} strokeLinejoin="round" />
        <polygon points="932,360 988,360 960,446" fill={BRANCO} />
        <path d="M 946 366 L 974 382 L 974 366 L 946 382 Z" fill={PRETO} />
        <path d="M 920 362 L 960 480 L 1000 362" stroke={BRANCO} strokeWidth={4} fill="none" />
        {[500, 540, 580].map((y) => (
          <circle key={y} cx={960} cy={y} r={8} fill={BRANCO} />
        ))}
      </Cai>
      {/* chapéu-coco */}
      <Cai f={f} pouso={24}>
        <g transform={`translate(960 ${tip ? 150 : 200}) rotate(${tip ? -14 : 0}) scale(0.88)`}>
          <ChapeuCoco cor={PRETO} contorno={BRANCO} detalhe={CINZA} />
        </g>
      </Cai>
      {/* sapatões, bicos para fora */}
      <Cai f={f} pouso={132}>
        <g transform="translate(930 950) scale(-0.78 0.78)">
          <Sapatao cor={PRETO} contorno={BRANCO} detalhe={CINZA} />
        </g>
        <g transform="translate(990 950) scale(0.78 0.78)">
          <Sapatao cor={PRETO} contorno={BRANCO} detalhe={CINZA} />
        </g>
      </Cai>
      {/* bengala */}
      <Cai f={f} pouso={168}>
        <g transform={`translate(1140 566) rotate(${tip ? 8 : 0} 0 380)`}>
          <Bengala c={380} cor={SEPIA} largura={16} />
        </g>
      </Cai>
      {/* bigodinho */}
      <Cai f={f} pouso={204}>
        <g transform="translate(960 286) scale(0.95)">
          <Bigodinho />
        </g>
      </Cai>
    </svg>
  );
};
