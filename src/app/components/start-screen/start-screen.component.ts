import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from 'src/global/game.service';

interface ApiData {
  data: Datson[];
}

interface Datson {
  preview: string;
}

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss'],
})
export class StartScreenComponent implements OnInit {
  settingsOn = false;
  constructor(
    private http: HttpClient,
    private gameService: GameService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  changeSettings() {
    this.settingsOn = !this.settingsOn;
  }

  startGame() {
    this.router.navigate(['/guess']);
  }

  get playerLost() {
    return this.gameService.game.lost
  }
}
