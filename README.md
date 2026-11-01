# Carlitos — a origem do cinema de Charlie Chaplin

Vídeo em motion graphics (~3 min, 1920x1080, 30 fps) para crianças do 2º ano,
no estilo dos letreiros do cinema mudo. Feito com [Remotion](https://www.remotion.dev)
(React + TypeScript); tudo é desenhado em código (SVG/CSS).

## Comandos

```bash
npm install
npx remotion studio          # preview interativo (ou: npm run studio)
npx remotion render Chaplin out/chaplin.mp4   # render final (ou: npm run render)
npm run stills               # PNG do meio de cada quadro/letreiro em out/stills
npm run projetor             # regenera public/projetor.wav (precisa de ffmpeg)
```

## Onde editar

- **`src/roteiro.ts`** — todos os textos dos letreiros e as durações das cenas.
  A duração de cada letreiro é calculada pela regra de leitura
  (1 s a cada 3 palavras + 2 s) e há uma trava de 14 palavras por letreiro.
- `src/cenas/` — uma ilustração animada por cena.
- `src/componentes/` — moldura art déco, letreiro, película antiga, íris, figurino.
- `src/estilo.ts` — paleta (#0d0d0d, #f2ead8, #a68a64, #6b6b6b) e fontes.

## Som

- `public/projetor.wav` — ruído de projetor sintetizado (cenas 1 e 12).
- `public/trilha.mp3` — **opcional**. Se existir, toca como trilha contínua
  (volume 0,6, fade in 2 s, fade out 3 s). Use apenas gravações em domínio público.

---

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1vmc5XIylVhySEeFLqix_zwbDmiNlWhNh

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
