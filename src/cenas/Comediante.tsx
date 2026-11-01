import React from 'react';
import {Pose, Silhueta} from '../componentes/Formas';
import {CINZA, PRETO, degrau} from '../estilo';
import {CHAO_PALCO, Palco} from './Palco';

const Y = CHAO_PALCO - 6;
const POSES: Pose[] = [
  // perna para o lado, braços abertos
  {
    cabeca: [930, Y - 460], pescoco: [940, Y - 405], quadril: [960, Y - 215],
    cotoveloE: [860, Y - 360], maoE: [780, Y - 400],
    cotoveloD: [1030, Y - 330], maoD: [1110, Y - 370],
    joelhoE: [945, Y - 105], peE: [940, Y],
    joelhoD: [1070, Y - 170], peD: [1180, Y - 190],
  },
  // susto: braços para cima, joelhos dobrados
  {
    cabeca: [975, Y - 445], pescoco: [970, Y - 390], quadril: [960, Y - 200],
    cotoveloE: [880, Y - 430], maoE: [860, Y - 530],
    cotoveloD: [1050, Y - 430], maoD: [1070, Y - 530],
    joelhoE: [880, Y - 100], peE: [860, Y],
    joelhoD: [1040, Y - 100], peD: [1060, Y],
  },
  // escorregão: corpo para trás, perna para cima
  {
    cabeca: [870, Y - 380], pescoco: [895, Y - 330], quadril: [970, Y - 165],
    cotoveloE: [810, Y - 380], maoE: [770, Y - 470],
    cotoveloD: [990, Y - 380], maoD: [1070, Y - 430],
    joelhoE: [1080, Y - 210], peE: [1190, Y - 270],
    joelhoD: [960, Y - 80], peD: [990, Y],
  },
];

/** Plateia em primeiro plano (silhuetas de cabeças que "riem" pulando). */
const Plateia: React.FC<{f: number}> = ({f}) => {
  const g = degrau(f, 2);
  return (
    <g>
      {[...Array(11)].map((_, i) => {
        const x = 40 + i * 185;
        const pulo = Math.abs(Math.sin((g + i * 7) / 3.2)) * 16;
        return (
          <g key={i} transform={`translate(${x} ${-pulo})`}>
            <path d="M -95 1100 Q -95 990 0 985 Q 95 990 95 1100 Z" fill={PRETO} stroke={CINZA} strokeWidth={4} />
            <circle cx={0} cy={935} r={58} fill={PRETO} stroke={CINZA} strokeWidth={4} />
          </g>
        );
      })}
    </g>
  );
};

export const Comediante: React.FC<{f: number}> = ({f}) => {
  // troca de pose "aos trancos": muda a cada 0,8 s, sem transição
  const pose = POSES[Math.floor(f / 24) % POSES.length];
  return (
    <Palco abertura={1} holofote={1} disco={{x: 960, y: 540, r: 330}} frente={<Plateia f={f} />}>
      <Silhueta pose={pose} tronco={70} membro={30} raioCabeca={42} />
    </Palco>
  );
};
