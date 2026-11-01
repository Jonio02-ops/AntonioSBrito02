import React from 'react';
import {Composition, Folder} from 'remotion';
import {Pelicula} from './componentes/Pelicula';
import {CenaVideo} from './Cena';
import {Filme} from './Filme';
import {ALTURA, LARGURA} from './estilo';
import {FPS} from './roteiro';
import {CENAS, CenaNoTempo, DURACAO_TOTAL} from './tempo';

const CenaAvulsa: React.FC<{cena: CenaNoTempo}> = ({cena}) => (
  <Pelicula>
    <CenaVideo cena={cena} />
  </Pelicula>
);

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Chaplin" component={Filme} durationInFrames={DURACAO_TOTAL} fps={FPS} width={LARGURA} height={ALTURA} />
    <Folder name="Cenas">
      {CENAS.map((cena, i) => (
        <Composition
          key={cena.id}
          id={`Cena${String(i + 1).padStart(2, '0')}-${cena.id}`}
          component={CenaAvulsa}
          defaultProps={{cena}}
          durationInFrames={cena.duracao}
          fps={FPS}
          width={LARGURA}
          height={ALTURA}
        />
      ))}
    </Folder>
  </>
);
