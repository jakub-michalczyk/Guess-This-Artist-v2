import { Injectable } from '@angular/core';
import { ARTISTS } from './artists';
import { Game } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  game: Game;

  constructor() {
    this.game = {
      genre: 'Rap',
      nationality: 'international',
      artist: 'Random',
      length: 150,
      score: 0,
      lifes: [
        { exists: true },
        { exists: true },
        { exists: true },
        { exists: true },
        { exists: true },
      ],
      options: {
        mode: ['lyrics', 'music'],
        genre: ['rap', 'pop', 'rock'],
        nationality: ['polish', 'international'],
        artist: ARTISTS,
      },
    };
  }

  updateSettings(setting: string, value: string | number) {
    this.game[setting] = value;
  }
}
