export interface Meteor {
  id: number;
  isBig: boolean;
  x: number;
  y: number;
  hasParachute: boolean;
  clickCount: number;
  speed: number;
  opacity: number;
}

export interface FirstAidKit {
  x: number;
  y: number;
}

export interface GameResult {
  id: number;
  playerName: string;
  score: number;
}
