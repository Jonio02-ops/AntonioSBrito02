import {Cena, FPS, LEITURA, ROTEIRO, Segmento} from './roteiro';

export const contarPalavras = (texto: string): number =>
  texto.split(/\s+/).filter((p) => /[\p{L}\p{N}]/u.test(p)).length;

export const minimoLeitura = (texto: string): number =>
  contarPalavras(texto) * LEITURA.segundosPorPalavra + LEITURA.segundosExtras;

const arredondarMeio = (s: number) => Math.ceil(s * 2 - 1e-9) / 2;

export const segundosDoSegmento = (seg: Segmento, cena: Cena): number => {
  if (seg.tipo !== 'letreiro') return seg.segundos;
  const palavras = contarPalavras(seg.texto);
  if (palavras > LEITURA.maxPalavras) {
    throw new Error(
      `[roteiro] ${cena.titulo}: letreiro com ${palavras} palavras (máximo ${LEITURA.maxPalavras}). Divida em dois quadros: "${seg.texto}"`,
    );
  }
  const minimo = minimoLeitura(seg.texto);
  if (seg.segundos !== undefined) {
    if (seg.segundos < minimo) {
      throw new Error(
        `[roteiro] ${cena.titulo}: letreiro precisa de pelo menos ${minimo.toFixed(2)} s, mas tem ${seg.segundos} s: "${seg.texto}"`,
      );
    }
    return seg.segundos;
  }
  return arredondarMeio(minimo + LEITURA.folga);
};

export type SegmentoNoTempo = Segmento & {
  inicio: number; // frame dentro da cena
  duracao: number; // frames
  /** Frame da ilustração no início deste segmento (ilustração "pausa" nos letreiros). */
  ilustracaoInicio: number;
};

export type CenaNoTempo = Omit<Cena, 'segmentos'> & {
  duracao: number;
  segmentos: SegmentoNoTempo[];
  /** Total de frames de ilustração da cena. */
  duracaoIlustracao: number;
};

export const calcularCena = (cena: Cena): CenaNoTempo => {
  let inicio = 0;
  let ilus = 0;
  const segmentos = cena.segmentos.map((seg) => {
    const duracao = Math.round(segundosDoSegmento(seg, cena) * FPS);
    const s: SegmentoNoTempo = {...seg, inicio, duracao, ilustracaoInicio: ilus};
    inicio += duracao;
    if (seg.tipo === 'ilustracao') ilus += duracao;
    return s;
  });
  return {...cena, segmentos, duracao: inicio, duracaoIlustracao: ilus};
};

export const CENAS: CenaNoTempo[] = ROTEIRO.map(calcularCena);
export const DURACAO_TOTAL = CENAS.reduce((a, c) => a + c.duracao, 0);
