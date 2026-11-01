import React from 'react';
import {AbsoluteFill, Audio, Series, getStaticFiles, staticFile} from 'remotion';
import {Pelicula} from './componentes/Pelicula';
import {CenaVideo} from './Cena';
import {lerp} from './estilo';
import {AUDIO, FPS} from './roteiro';
import {CENAS, DURACAO_TOTAL} from './tempo';

const temTrilha = () => {
  try {
    return getStaticFiles().some((f) => f.name === 'trilha.mp3');
  } catch {
    return false;
  }
};

/** Composição principal: as 12 cenas em sequência + película + trilha. */
export const Filme: React.FC = () => (
  <AbsoluteFill>
    <Pelicula>
      <Series>
        {CENAS.map((cena) => (
          <Series.Sequence key={cena.id} durationInFrames={cena.duracao} name={cena.titulo}>
            <CenaVideo cena={cena} />
          </Series.Sequence>
        ))}
      </Series>
    </Pelicula>
    {temTrilha() && (
      <Audio
        src={staticFile('trilha.mp3')}
        loop
        volume={(f) =>
          AUDIO.trilhaVolume *
          Math.min(
            lerp(f, [0, AUDIO.trilhaFadeInSegundos * FPS], [0, 1]),
            lerp(f, [DURACAO_TOTAL - AUDIO.trilhaFadeOutSegundos * FPS, DURACAO_TOTAL], [1, 0]),
          )
        }
      />
    )}
  </AbsoluteFill>
);
