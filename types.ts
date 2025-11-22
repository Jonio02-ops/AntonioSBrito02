export enum PlayTone {
  DRAMATIC = 'Dramático e Intenso',
  LIGHTHEARTED = 'Leve e Esperançoso',
  ABSTRACT = 'Abstrato e Simbólico',
  EDUCATIONAL = 'Educativo e Claro',
  COMEDIC = 'Satírico e Irônico'
}

export interface PlayRequest {
  need: string;
  tone: PlayTone;
  characters: number;
}

export interface PlayResponse {
  title: string;
  synopsis: string;
  content: string; // The full markdown script
}

export enum AppState {
  IDLE = 'IDLE',
  GENERATING = 'GENERATING',
  SHOWING_RESULT = 'SHOWING_RESULT',
  ERROR = 'ERROR'
}