// Gera um PNG do meio de cada segmento (quadro ilustrado / letreiro) de cada cena.
// Uso: node scripts/stills.mjs [--saida=out/stills] [--cenas=1,2] [--browser=/caminho/chrome]
import {bundle} from '@remotion/bundler';
import {getCompositions, renderStill} from '@remotion/renderer';
import fs from 'node:fs';
import path from 'node:path';

const arg = (nome) => process.argv.find((a) => a.startsWith(`--${nome}=`))?.split('=')[1];
const saida = arg('saida') ?? 'out/stills';
const browserExecutable = arg('browser') ?? null;
const so = arg('cenas')?.split(',').map(Number);
// --comp=Chaplin --frames=10,200  → renderiza frames específicos de uma composição
const compId = arg('comp');
const frames = arg('frames')?.split(',').map(Number);
fs.mkdirSync(saida, {recursive: true});

const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts')});
const comps = await getCompositions(serveUrl, {browserExecutable});
if (compId) {
  const composition = comps.find((c) => c.id === compId);
  for (const frame of frames ?? [0]) {
    const output = path.join(saida, `${compId}-f${frame}.png`);
    await renderStill({serveUrl, composition, frame, output, overwrite: true, browserExecutable});
    console.log(output);
  }
  process.exit(0);
}
const cenas = comps.filter((c) => c.id.startsWith('Cena'));

for (const [i, composition] of cenas.entries()) {
  if (so && !so.includes(i + 1)) continue;
  for (const [k, seg] of composition.props.cena.segmentos.entries()) {
    const frame = Math.floor(seg.inicio + seg.duracao / 2);
    const output = path.join(saida, `${composition.id}-${k + 1}-${seg.tipo}.png`);
    await renderStill({serveUrl, composition, frame, output, overwrite: true, browserExecutable});
    console.log(output, `(frame ${frame})`);
  }
}
