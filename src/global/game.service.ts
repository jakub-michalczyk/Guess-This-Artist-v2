import { Injectable } from '@angular/core';
import { Game } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  game: Game;

  constructor() {
    this.game = {
      mode: 'lyrics',
      difficulty: 'normal',
      genre: 'rap',
      similarity: 'normal',
      nationality: 'custom',
      artists: [],
      length: 150,
      options: {
        mode: ['lyrics', 'music'],
        difficulty: ['easy', 'normal', 'hard', 'custom'],
        similarity: ['poor', 'normal', 'great'],
        length: ['short', 'normal', 'long'],
        genre: ['rap', 'pop', 'rock'],
        nationality: ['poland', 'usa', 'custom'],
      },
    };
  }

  updateSettings(setting: string, value: string | number) {
    this.game[setting] = value;
  }
}
