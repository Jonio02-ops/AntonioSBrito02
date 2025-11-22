import { GoogleGenAI } from "@google/genai";
import { PlayRequest, PlayResponse } from "../types";

// Initialize the Gemini API client
// The API key is guaranteed to be in process.env.API_KEY per instructions
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generatePlayScript = async (request: PlayRequest): Promise<PlayResponse> => {
  const prompt = `
    Você é um dramaturgo premiado e especialista em psicodrama.
    Sua tarefa é escrever uma peça de teatro curta (aprox. 3 a 5 minutos de leitura) baseada na seguinte necessidade psicológica ou social:

    NECESSIDADE/TEMA: "${request.need}"
    TOM DA PEÇA: ${request.tone}
    NÚMERO SUGERIDO DE PERSONAGENS: ${request.characters}

    Estrutura da Resposta (Formato JSON estrito):
    {
      "title": "Um título criativo para a peça",
      "synopsis": "Um breve resumo do conflito e da resolução (máx 2 frases)",
      "content": "O roteiro completo em formato Markdown. Use **Negrito** para nomes de personagens antes das falas. Use *Itálico* entre parênteses para rúbricas e ações de palco. Inclua uma lista de personagens e descrição do cenário no início."
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        // Using a slightly higher temperature for creativity
        temperature: 0.8, 
      },
    });

    if (!response.text) {
      throw new Error("Nenhuma resposta foi gerada pelo modelo.");
    }

    const parsedResponse = JSON.parse(response.text) as PlayResponse;
    return parsedResponse;

  } catch (error) {
    console.error("Erro ao gerar a peça:", error);
    throw new Error("Falha ao conectar com a musa inspiradora (Erro na API).");
  }
};