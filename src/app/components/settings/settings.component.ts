import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GameService } from 'src/global/game.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  @Output()
  hideSettings = new EventEmitter<boolean>();
  @Input()
  settings = false;
  hide = false;
  constructor(private gameService: GameService) {}

  handleUpdateSettings(changed: { name: string; value: string }) {
    this.gameService.updateSettings(changed.name, changed.value);
  }

  closeSettings() {
    this.hide = true;
    setTimeout(() => {
      this.hide = false;
      this.hideSettings.emit(true);
    }, 500);
  }

  get gameSettings() {
    return this.gameService;
  }

  get artists(): string[] {
    let allArtists: string[] = [];
    this.gameSettings.game.options.artist.forEach((artist) =>
      allArtists.push(artist.name)
    );

    return allArtists.sort();
  }
}
