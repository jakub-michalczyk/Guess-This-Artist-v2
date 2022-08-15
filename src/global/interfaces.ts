export interface Game {
  [setting: string]: string | number | string[] | Option;
  mode: string;
  difficulty: string;
  genre: string;
  artists: string[];
  options: Option;
  length: number;
}

export interface Option {
  mode: string[];
  difficulty: string[];
  length: string[];
  genre: string[];
  nationality: string[];
  similarity: string[];
}
