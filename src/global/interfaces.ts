export interface Game {
  [setting: string]: string | number | string[] | Life[] | Option | SongData[];
  artist: string;
  lifes: Life[];
  score: number;
  genre: string;
  guessedSongs: string[];
  nationality: 'polish' | 'international';
  options: Option;
  length: number;
}

export interface Option {
  mode: string[];
  genre: string[];
  nationality: string[];
  artist: Artist[];
}

export interface Artist {
  id?: number;
  name: string;
  genre?: string[];
  nationality?: 'polish' | 'international';
  image?: string;
}

export interface Song {
  name: string;
}

export interface Life {
  exists: boolean;
}

export interface Timer {
  minutes: number;
  seconds: number;
}

export interface GuessField {
  type: 'artist' | 'song';
  data: Artist[] | Song[];
}

export interface SongsData {
  data: SongData[];
}

export interface SongData {
  title: string;
}

export interface TrackData {
  preview: string;
  artist: Artist;
  title: string;
}

export interface ErrorFallback {
  error: ErrorData;
}

export interface ErrorData {
  type: string;
  message: string;
  code: number;
}

export interface FallbackData {
  data: [];
}
