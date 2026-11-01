import React from 'react';
import {AbsoluteFill} from 'remotion';
import {BRANCO, FONTE_TEXTO, FONTE_TITULO, PRETO, lerp, suave} from '../estilo';
import {Moldura, Separador} from './Moldura';

/**
 * Letreiro (intertítulo) do cinema mudo: texto branco quente sobre preto,
 * dentro da moldura art déco. Entra com fade e leve escala.
 */
export const Letreiro: React.FC<{
  texto: string;
  f: number; // frame local do letreiro
  piscar?: boolean;
  fim?: boolean;
}> = ({texto, f, piscar, fim}) => {
  const escala = lerp(f, [0, 14], [0.965, 1], suave);
  // Piada metalinguística: o letreiro "pisca" uma vez (como película falhando).
  const apagado = piscar && f >= 40 && f < 46;
  const palavras = texto.split(/\s+/).length;
  const tamanho = fim ? 300 : palavras > 9 ? 84 : 92;
  return (
    <AbsoluteFill style={{background: PRETO}}>
      <AbsoluteFill style={{opacity: apagado ? 0 : 1, transform: `scale(${escala})`}}>
        <Moldura />
        <AbsoluteFill
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: '200px 230px 150px',
          }}
        >
          <div
            style={{
              fontFamily: fim ? FONTE_TITULO : FONTE_TEXTO,
              fontWeight: fim ? 400 : 500,
              fontSize: tamanho,
              lineHeight: 1.32,
              color: BRANCO,
              textAlign: 'center',
              letterSpacing: fim ? 24 : 0.5,
              maxWidth: 1440,
              textWrap: 'balance',
            }}
          >
            {texto.split(/(\S*-\S*)/).map((parte, k) =>
              parte.includes('-') ? (
                <span key={k} style={{whiteSpace: 'nowrap'}}>
                  {parte}
                </span>
              ) : (
                parte
              ),
            )}
          </div>
          {!fim && (
            <div style={{marginTop: 44}}>
              <Separador />
            </div>
          )}
        </AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
