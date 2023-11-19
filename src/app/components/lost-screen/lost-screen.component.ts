import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from 'src/global/game.service';

@Component({
  selector: 'app-lost-screen',
  templateUrl: './lost-screen.component.html',
  styleUrls: ['./lost-screen.component.scss'],
})
export class LostScreenComponent implements OnInit {
  @ViewChild('gameOver') gameOverOverlayer!: ElementRef<HTMLDivElement>;
  backgroundImage: string | undefined;
  score: number | undefined;
  track: string | undefined;
  artist: string | undefined;
  constructor(private gameService: GameService, private router: Router) {}

  ngOnInit(): void {
    this.backgroundImage = `url(${this.gameService.game.currentGameData.img})`;
    this.score = this.gameService.game.score;
    this.track = this.gameService.game.currentGameData.track;
    this.artist = this.gameService.game.currentGameData.artist;
  }

  restartAfterLost() {
    this.gameService.game.lifes.forEach((life) => (life.exists = true));
    this.gameService.game.score = 0;
    this.gameOverOverlayer.nativeElement.classList.remove(
      'game-over-overlayer-full'
    );
    this.router.navigate(['/guess']);
  }
}
