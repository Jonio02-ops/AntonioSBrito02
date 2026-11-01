/**
 * ROTEIRO DO VÍDEO — edite aqui textos e durações.
 *
 * Cada cena é uma lista de "segmentos", tocados em ordem (como no cinema mudo,
 * alternando quadro ilustrado e letreiro):
 *
 *   { tipo: 'ilustracao', segundos: 4 }
 *       Mostra a ilustração animada da cena por 4 segundos. Se a cena tiver
 *       vários segmentos de ilustração, a animação continua de onde parou.
 *
 *   { tipo: 'letreiro', texto: '...' }
 *       Mostra um letreiro (intertítulo). A duração é calculada sozinha pela
 *       regra de leitura (veja LEITURA abaixo). Se quiser mais tempo, use
 *       `segundos: 8` — valores abaixo do mínimo de leitura geram erro.
 *       `piscar: true` faz o letreiro piscar uma vez.
 *       Máximo de 14 palavras por letreiro (passou disso, divida em dois).
 *
 *   { tipo: 'fim', texto: 'FIM', segundos: 4 }
 *       Quadro final em moldura art déco, com a íris fechando no fim.
 *
 * A duração de cada cena = soma dos seus segmentos. O total aparece no
 * Remotion Studio (npx remotion studio).
 */

export const FPS = 30;

/** Regra de leitura: pelo menos 1 s a cada 3 palavras + 2 s. */
export const LEITURA = {
  segundosPorPalavra: 1 / 3,
  segundosExtras: 2,
  /** Folga somada ao mínimo (cobre o fade de entrada/saída). */
  folga: 0.25,
  maxPalavras: 14,
};

/** Volume da trilha (public/trilha.mp3, opcional) e do ruído de projetor. */
export const AUDIO = {
  trilhaVolume: 0.6,
  trilhaFadeInSegundos: 2,
  trilhaFadeOutSegundos: 3,
  projetorVolume: 0.22,
};

export type Segmento =
  | {tipo: 'ilustracao'; segundos: number}
  | {tipo: 'letreiro'; texto: string; segundos?: number; piscar?: boolean}
  | {tipo: 'fim'; texto: string; segundos: number};

export type Cena = {
  /** Identificador interno (liga a cena à ilustração). Não altere. */
  id: string;
  titulo: string;
  /** Toca o ruído de projetor nesta cena. */
  projetor?: boolean;
  segmentos: Segmento[];
};

export const ROTEIRO: Cena[] = [
  {
    id: 'abertura',
    titulo: '1. Abertura',
    projetor: true,
    segmentos: [
      // 0–3,5 s: contagem 3-2-1; depois a íris abre sobre o projetor.
      {tipo: 'ilustracao', segundos: 6.5},
      {
        tipo: 'letreiro',
        texto:
          'Há muito tempo, os filmes não tinham som. Mas faziam o mundo inteiro rir!',
      },
    ],
  },
  {
    id: 'londres',
    titulo: '2. Londres',
    segmentos: [
      {tipo: 'ilustracao', segundos: 9},
      {
        tipo: 'letreiro',
        texto: 'Em Londres, em 1889, nasceu um menino chamado Charlie Chaplin.',
      },
    ],
  },
  {
    id: 'palco',
    titulo: '3. No palco aos cinco anos',
    segmentos: [
      {tipo: 'ilustracao', segundos: 4},
      {
        tipo: 'letreiro',
        texto: 'Sua mãe era cantora de teatro. Um dia, a voz dela falhou...',
      },
      {tipo: 'ilustracao', segundos: 3},
      {
        tipo: 'letreiro',
        texto:
          '...e o pequeno Charlie subiu ao palco para cantar no lugar dela!',
      },
    ],
  },
  {
    id: 'comediante',
    titulo: '4. Comediante',
    segmentos: [
      {tipo: 'ilustracao', segundos: 7},
      {
        tipo: 'letreiro',
        texto:
          'Charlie cresceu e virou comediante. Ele fazia o público rir só com o corpo!',
      },
    ],
  },
  {
    id: 'navio',
    titulo: '5. Rumo à América',
    segmentos: [
      {tipo: 'ilustracao', segundos: 7.5},
      {
        tipo: 'letreiro',
        texto:
          'Um dia, Charlie atravessou o mar de navio até os Estados Unidos.',
      },
    ],
  },
  {
    id: 'cinema-mudo',
    titulo: '6. Cinema mudo',
    segmentos: [
      {tipo: 'ilustracao', segundos: 5},
      {
        tipo: 'letreiro',
        texto:
          'Naquele tempo, os filmes eram mudos. Um pianista tocava ao vivo...',
      },
      {
        tipo: 'letreiro',
        texto: '...e as falas apareciam assim... em letreiros!',
        piscar: true,
        segundos: 5.5,
      },
    ],
  },
  {
    id: 'carlitos',
    titulo: '7. Nasce Carlitos',
    segmentos: [
      {tipo: 'ilustracao', segundos: 9},
      {
        tipo: 'letreiro',
        texto:
          'Em 1914, Charlie inventou um personagem: o Carlitos! Chapéu-coco, bengala, calça larga e sapatões.',
      },
    ],
  },
  {
    id: 'corpo',
    titulo: '8. Rir com o corpo',
    segmentos: [
      {tipo: 'ilustracao', segundos: 9},
      {
        tipo: 'letreiro',
        texto:
          'Carlitos tropeçava, corria, girava a bengala... e todo mundo ria!',
      },
    ],
  },
  {
    id: 'camera',
    titulo: '9. Rir e chorar',
    segmentos: [
      {tipo: 'ilustracao', segundos: 4},
      {
        tipo: 'letreiro',
        texto:
          'Charlie escrevia, dirigia, atuava e até compunha as músicas.',
      },
      {tipo: 'ilustracao', segundos: 3},
      {
        tipo: 'letreiro',
        texto:
          'Em O Garoto, de 1921, o público riu e chorou junto com Carlitos.',
      },
    ],
  },
  {
    id: 'cinema-fala',
    titulo: '10. O cinema fala',
    segmentos: [
      {tipo: 'ilustracao', segundos: 8},
      {
        tipo: 'letreiro',
        texto:
          'Em 1927, aconteceu uma novidade: os filmes começaram a ter vozes!',
      },
    ],
  },
  {
    id: 'engrenagens',
    titulo: '11. Carlitos não quis falar',
    segmentos: [
      {tipo: 'ilustracao', segundos: 4.5},
      {
        tipo: 'letreiro',
        texto: 'Mas Charlie continuou fazendo filmes sem falas!',
      },
      {tipo: 'ilustracao', segundos: 3.5},
      {
        tipo: 'letreiro',
        texto:
          'Em Tempos Modernos, de 1936, Carlitos cantou uma música... com palavras inventadas!',
      },
    ],
  },
  {
    id: 'encerramento',
    titulo: '12. Encerramento',
    projetor: true,
    segmentos: [
      {tipo: 'ilustracao', segundos: 4},
      {
        tipo: 'letreiro',
        texto:
          'Carlitos não precisou de palavras para contar suas histórias.',
      },
      {
        tipo: 'letreiro',
        texto: 'E você? Consegue contar uma história sem falar?',
      },
      {tipo: 'fim', texto: 'FIM', segundos: 4},
    ],
  },
];
