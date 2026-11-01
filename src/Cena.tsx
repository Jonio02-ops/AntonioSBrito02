import React from 'react';
import {AbsoluteFill, Audio, staticFile, useCurrentFrame} from 'remotion';
import {Iris} from './componentes/Iris';
import {Letreiro} from './componentes/Letreiro';
import {lerp, degrau} from './estilo';
import {AUDIO} from './roteiro';
import {CenaNoTempo} from './tempo';
import {Abertura} from './cenas/Abertura';
import {Londres} from './cenas/Londres';
import {NoPalco} from './cenas/NoPalco';
import {Comediante} from './cenas/Comediante';
import {NavioCena} from './cenas/Navio';
import {CinemaMudo} from './cenas/CinemaMudo';
import {Carlitos} from './cenas/Carlitos';
import {Corpo} from './cenas/Corpo';
import {Camera} from './cenas/Camera';
import {CinemaFala} from './cenas/CinemaFala';
import {Engrenagens} from './cenas/Engrenagens';
import {Encerramento} from './cenas/Encerramento';

/** Liga o `id` de cada cena do roteiro à sua ilustração animada. */
export const ILUSTRACOES: Record<string, React.FC<{f: number}>> = {
  abertura: Abertura,
  londres: Londres,
  palco: NoPalco,
  comediante: Comediante,
  navio: NavioCena,
  'cinema-mudo': CinemaMudo,
  carlitos: Carlitos,
  corpo: Corpo,
  camera: Camera,
  'cinema-fala': CinemaFala,
  engrenagens: Engrenagens,
  encerramento: Encerramento,
};

const FADE_CENA = 9; // fade pelo preto entre cenas
const FADE_CORTE = 5; // corte rápido entre quadro e letreiro

export const CenaVideo: React.FC<{cena: CenaNoTempo}> = ({cena}) => {
  const frame = useCurrentFrame();
  const segs = cena.segmentos;
  let i = segs.findIndex((s) => frame >= s.inicio && frame < s.inicio + s.duracao);
  if (i < 0) i = segs.length - 1;
  const seg = segs[i];
  const local = frame - seg.inicio;

  const entrada = i === 0 ? FADE_CENA : FADE_CORTE;
  const ehFim = seg.tipo === 'fim';
  const saida = ehFim ? 0 : i === segs.length - 1 ? FADE_CENA : FADE_CORTE;
  const opacidade = Math.min(
    lerp(local, [0, entrada], [0, 1]),
    saida ? lerp(local, [seg.duracao - saida, seg.duracao], [1, 0]) : 1,
  );

  let conteudo: React.ReactNode;
  if (seg.tipo === 'ilustracao') {
    const Ilustracao = ILUSTRACOES[cena.id];
    if (!Ilustracao) throw new Error(`Sem ilustração para a cena "${cena.id}"`);
    conteudo = <Ilustracao f={seg.ilustracaoInicio + local} />;
  } else if (seg.tipo === 'letreiro') {
    conteudo = <Letreiro texto={seg.texto} f={local} piscar={seg.piscar} />;
  } else {
    // FIM + íris fechando
    const r = lerp(degrau(local, 2), [seg.duracao - 54, seg.duracao - 10], [1150, 0]);
    conteudo = (
      <AbsoluteFill>
        <Letreiro texto={seg.texto} f={local} fim />
        <Iris r={r} />
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{opacity: opacidade}}>{conteudo}</AbsoluteFill>
      {cena.projetor && (
        <Audio
          src={staticFile('projetor.wav')}
          loop
          volume={(f) =>
            AUDIO.projetorVolume *
            Math.min(lerp(f, [0, 15], [0, 1]), lerp(f, [cena.duracao - 30, cena.duracao], [1, 0]))
          }
        />
      )}
    </AbsoluteFill>
  );
};
