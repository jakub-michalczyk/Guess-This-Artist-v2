import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ARTISTS } from 'src/global/artists';
import { GameService } from 'src/global/game.service';

@Component({
  selector: 'app-settings-select',
  styleUrls: ['./settings-select.component.scss'],
  templateUrl: './settings-select.component.html',
})
export class SettingsSelectComponent implements OnInit {
  artists = ARTISTS;
  @Input()
  name = '';
  @Input()
  heading = '';
  @Input()
  option = {};
  @Input()
  avaiableOptions: string[] = [];
  @Output()
  changeVal = new EventEmitter<{ name: string; value: string }>();

  constructor(
    private gameService: GameService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  onChangeVal(name: string, value: string) {
    this.changeVal.emit({ name: name, value: value });

    if (name === 'artist') {
      this.updateNationalityAndGenre(value);
    } else {
      this.gameService.game.artist = 'Random';
      let select = document.querySelector('#artist') as HTMLSelectElement;
      select.value = this.gameService.game.artist;
    }

    this.ref.detectChanges();
  }

  updateNationalityAndGenre(artist: string) {
    if (artist !== 'Random') {
      let data = this.artists.find((a) => a.name === artist)!;

      this.gameService.game.genre = data.genre[0];
      this.gameService.game.nationality = data.nationality;
    } else {
      this.gameService.game.genre = 'Rap';
      this.gameService.game.nationality = 'international';
    }

    this.ref.detectChanges();
  }
}
