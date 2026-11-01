import React from 'react';
import {BRANCO, CINZA, PRETO, SEPIA} from '../estilo';

type Cores = {cor?: string; contorno?: string; detalhe?: string};

/** Chapéu-coco. Origem no centro da aba, embaixo. Largura ~250. */
export const ChapeuCoco: React.FC<Cores> = ({cor = PRETO, contorno = 'none', detalhe = CINZA}) => (
  <g>
    <path
      d="M -76 0 C -82 -62 -58 -104 0 -106 C 58 -104 82 -62 76 0 Z"
      fill={cor}
      stroke={contorno}
      strokeWidth={4}
    />
    <path d="M -78 -2 L 78 -2 L 77 -24 L -77 -24 Z" fill={detalhe} />
    <path
      d="M -128 4 Q -110 -14 -60 -6 L 60 -6 Q 110 -14 128 4 Q 100 16 0 16 Q -100 16 -128 4 Z"
      fill={cor}
      stroke={contorno}
      strokeWidth={4}
    />
  </g>
);

/** Bengala com cabo curvo. Origem no topo do cabo reto; comprimento c. */
export const Bengala: React.FC<{c?: number; cor?: string; largura?: number}> = ({
  c = 420,
  cor = SEPIA,
  largura = 14,
}) => (
  <path
    d={`M 0 ${c} L 0 34 A 34 34 0 0 0 -68 34 L -68 48`}
    fill="none"
    stroke={cor}
    strokeWidth={largura}
    strokeLinecap="round"
  />
);

/** Sapatão de perfil, bico para a direita. Origem: chão, embaixo do calcanhar. */
export const Sapatao: React.FC<Cores> = ({cor = PRETO, contorno = 'none', detalhe = CINZA}) => (
  <g>
    <path
      d="M -10 0 L 190 0 Q 236 0 234 -30 Q 230 -62 168 -66 L 92 -70 L 70 -104 L 14 -104 Q 0 -70 -14 -44 Q -22 -20 -10 0 Z"
      fill={cor}
      stroke={contorno}
      strokeWidth={4}
      strokeLinejoin="round"
    />
    <path d="M -12 -6 L 232 -6" stroke={detalhe} strokeWidth={6} />
    <path d="M 96 -62 l 18 -10 M 112 -60 l 18 -10" stroke={detalhe} strokeWidth={4} />
  </g>
);

/** Bigodinho isolado. Origem no centro. */
export const Bigodinho: React.FC<{cor?: string}> = ({cor = PRETO}) => (
  <path d="M -32 10 L 32 10 L 27 -12 L -27 -12 Z" fill={cor} />
);

/** Colcheia (nota musical). Origem na cabeça da nota. */
export const Nota: React.FC<{cor?: string; dupla?: boolean}> = ({cor = BRANCO, dupla}) =>
  dupla ? (
    <g fill={cor}>
      <ellipse cx={0} cy={0} rx={22} ry={15} transform="rotate(-22)" />
      <ellipse cx={70} cy={-14} rx={22} ry={15} transform="rotate(-22 70 -14)" />
      <rect x={16} y={-92} width={7} height={88} />
      <rect x={86} y={-106} width={7} height={88} />
      <path d="M 16 -92 L 93 -106 L 93 -88 L 16 -74 Z" />
    </g>
  ) : (
    <g fill={cor}>
      <ellipse cx={0} cy={0} rx={22} ry={15} transform="rotate(-22)" />
      <rect x={16} y={-96} width={7} height={92} />
      <path d="M 22 -96 C 30 -70 70 -64 52 -26 C 60 -60 40 -64 22 -70 Z" />
    </g>
  );

/** Coração. Origem no centro. Tamanho ~200. */
export const Coracao: React.FC<{cor?: string; contorno?: string}> = ({cor = BRANCO, contorno = 'none'}) => (
  <path
    d="M 0 90 C -60 40 -110 6 -110 -40 C -110 -80 -78 -100 -50 -100 C -22 -100 -6 -82 0 -64 C 6 -82 22 -100 50 -100 C 78 -100 110 -80 110 -40 C 110 6 60 40 0 90 Z"
    fill={cor}
    stroke={contorno}
    strokeWidth={6}
    strokeLinejoin="round"
  />
);

/** Pegada de sapatão vista de cima (bico para cima). */
export const Pegada: React.FC<{cor?: string}> = ({cor = PRETO}) => (
  <g fill={cor}>
    <path d="M 0 -70 C 30 -70 38 -40 34 -14 C 30 6 20 14 0 14 C -20 14 -30 6 -34 -14 C -38 -40 -30 -70 0 -70 Z" />
    <path d="M -22 30 L 22 30 Q 26 62 0 64 Q -26 62 -22 30 Z" />
  </g>
);

/** Silhueta humana a partir de uma pose (pontos das articulações). */
export type Pose = {
  cabeca: [number, number];
  pescoco: [number, number];
  quadril: [number, number];
  cotoveloE: [number, number];
  maoE: [number, number];
  cotoveloD: [number, number];
  maoD: [number, number];
  joelhoE: [number, number];
  peE: [number, number];
  joelhoD: [number, number];
  peD: [number, number];
};

export const Silhueta: React.FC<{
  pose: Pose;
  cor?: string;
  tronco?: number;
  membro?: number;
  raioCabeca?: number;
  chapeuInfantil?: boolean;
}> = ({pose: p, cor = PRETO, tronco = 64, membro = 28, raioCabeca = 40, chapeuInfantil}) => {
  const l = (a: [number, number], b: [number, number], c: [number, number]) =>
    `M ${a[0]} ${a[1]} L ${b[0]} ${b[1]} L ${c[0]} ${c[1]}`;
  return (
    <g stroke={cor} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={`M ${p.pescoco[0]} ${p.pescoco[1]} L ${p.quadril[0]} ${p.quadril[1]}`} strokeWidth={tronco} />
      <path d={l(p.pescoco, p.cotoveloE, p.maoE)} strokeWidth={membro} />
      <path d={l(p.pescoco, p.cotoveloD, p.maoD)} strokeWidth={membro} />
      <path d={l(p.quadril, p.joelhoE, p.peE)} strokeWidth={membro + 4} />
      <path d={l(p.quadril, p.joelhoD, p.peD)} strokeWidth={membro + 4} />
      <circle cx={p.cabeca[0]} cy={p.cabeca[1]} r={raioCabeca} fill={cor} stroke="none" />
      <ellipse cx={p.peE[0] - 8} cy={p.peE[1]} rx={membro * 0.9} ry={membro * 0.45} fill={cor} stroke="none" />
      <ellipse cx={p.peD[0] + 8} cy={p.peD[1]} rx={membro * 0.9} ry={membro * 0.45} fill={cor} stroke="none" />
      {chapeuInfantil && (
        <path
          d={`M ${p.cabeca[0] - raioCabeca - 6} ${p.cabeca[1] - raioCabeca * 0.35} Q ${p.cabeca[0]} ${p.cabeca[1] - raioCabeca * 1.9} ${p.cabeca[0] + raioCabeca + 14} ${p.cabeca[1] - raioCabeca * 0.4} Z`}
          fill={cor}
          stroke="none"
        />
      )}
    </g>
  );
};

/** Engrenagem com n dentes. raio = raio primitivo. */
export const caminhoEngrenagem = (n: number, raio: number, altura = 34) => {
  const pts: string[] = [];
  const passo = (Math.PI * 2) / n;
  for (let i = 0; i < n; i++) {
    const a = i * passo;
    const ext = raio + altura / 2;
    const int = raio - altura / 2;
    const ang = [a - passo * 0.32, a - passo * 0.2, a + passo * 0.2, a + passo * 0.32];
    const rs = [int, ext, ext, int];
    ang.forEach((g, k) => pts.push(`${(rs[k] * Math.cos(g)).toFixed(1)} ${(rs[k] * Math.sin(g)).toFixed(1)}`));
  }
  return `M ${pts.join(' L ')} Z`;
};
