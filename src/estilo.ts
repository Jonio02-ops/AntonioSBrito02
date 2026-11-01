import {loadFont as carregarLimelight} from '@remotion/google-fonts/Limelight';
import {loadFont as carregarPlayfair} from '@remotion/google-fonts/PlayfairDisplay';
import {Easing, interpolate} from 'remotion';

/** Paleta única do vídeo. Nenhuma outra cor deve ser usada. */
export const PRETO = '#0d0d0d';
export const BRANCO = '#f2ead8';
export const SEPIA = '#a68a64';
export const CINZA = '#6b6b6b';

export const {fontFamily: FONTE_TITULO} = carregarLimelight('normal', {
  subsets: ['latin', 'latin-ext'],
});
export const {fontFamily: FONTE_TEXTO} = carregarPlayfair('normal', {
  weights: ['500', '700'],
  subsets: ['latin', 'latin-ext'],
});

export const LARGURA = 1920;
export const ALTURA = 1080;

/** Animação "aos trancos": congela o tempo em degraus de n frames. */
export const degrau = (f: number, n = 2) => f - (((f % n) + n) % n);

/** Interpolação com clamp (atalho). */
export const lerp = (
  f: number,
  entrada: [number, number],
  saida: [number, number],
  easing: (t: number) => number = (t) => t,
) =>
  interpolate(f, entrada, saida, {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing,
  });

export const suave = Easing.bezier(0.33, 0, 0.2, 1);
export const queda = Easing.in(Easing.quad);
