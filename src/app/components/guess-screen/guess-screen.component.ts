import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ARTISTS } from 'src/global/artists';
import { GameService } from 'src/global/game.service';
import {
  Artist,
  ErrorFallback,
  FallbackData,
  GuessField,
  SongsData,
  Timer,
  TrackData,
} from 'src/global/interfaces';
import { RequestService } from 'src/global/request.service';

@Component({
  selector: 'app-guess-screen',
  templateUrl: './guess-screen.component.html',
  styleUrls: ['./guess-screen.component.scss'],
})
export class GuessScreenComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private gameService: GameService,
    private requestService: RequestService
  ) {}

  timerObj: Timer = {
    minutes: 0,
    seconds: 30,
  };
  hideLoading = false;
  artist = ARTISTS;
  timerInterval = 0;
  private track = new Audio();
  private trackData = {} as TrackData;
  fields: GuessField[] = [
    { type: 'artist', data: [] },
    { type: 'song', data: [] },
  ];
  @Input() countdownEnded = false;
  artistData = {} as Artist;
  @ViewChild('artistName') artistName!: ElementRef<HTMLInputElement>;
  @ViewChild('songName') songName!: ElementRef<HTMLInputElement>;

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ data }) => {
      let isError = data as ErrorFallback;

      if (isError.error) {
        return this.errorHandling();
      } else {
        this.hideLoadingScreen();
        return this.init(data);
      }
    });
  }

  init(data: FallbackData) {
    let random = Math.floor(Math.random() * data.data.length);

    this.trackData = data.data[random];
    this.track.src = this.trackData.preview;
    this.track.volume = 0.3;

    if (this.countdownEnded) {
      this.start();
    }

    this.artistData = this.trackData.artist;
  }

  start() {
    this.track.play();
    this.startCountdown();
  }

  errorHandling() {
    this.requestService.getTrack(this.artist).subscribe((data) => {
      let isError = data as ErrorFallback;

      if (isError.error) {
        return this.errorHandling();
      } else {
        let fallback = data as FallbackData;
        this.hideLoadingScreen();
        return this.init(fallback);
      }
    });
  }

  hideLoadingScreen() {
    this.hideLoading = true;
  }

  startCountdown() {
    this.timerInterval = window.setInterval(() => {
      !!this.timerObj.minutes ? this.timerObj.minutes-- : null;
      !!this.timerObj.seconds ? this.timerObj.seconds-- : null;

      if (this.timerObj.seconds < 6 && this.track.volume > 0) {
        this.track.volume -= 0.05;
      }
    }, 1000);
  }

  validateSongs(data: string[]) {
    this.requestService.getSimiliarSongs(this.songNameValue).then((dataObs) => {
      dataObs?.subscribe((songs) => {
        let songsData = songs as SongsData;
        songsData.data.forEach((song) => {
          if (!data.includes(song.title)) {
            data.push(song.title);
          }
        });
      });
    });
  }

  validateArtists(data: Artist[]) {
    this.artist.forEach((artist) => {
      if (this.artistNameValue) {
        if (
          artist.name.toLowerCase().includes(this.artistNameValue) ||
          artist.name
            .replace(/[^a-zA-Z ]/g, '')
            .toLowerCase()
            .includes(this.artistNameValue.replace(/[^a-zA-Z ]/g, ''))
        ) {
          data.push(artist);
        }
      }
    });
  }

  checkGuess() {
    if (
      this.artistNameValue === this.trackData.artist.name &&
      this.songNameValue === this.trackData.title
    ) {
      alert('You Guessed!');
    } else {
      alert("Oh, you didn't guessed");
      console.log(this.trackData.artist.name, this.trackData.title);
    }
  }

  closeHintList(type: 'artist' | 'song') {
    this.fields.find((field) => field.type === type)!.data = [];
  }

  chooseArtist(data: Artist) {
    this.artistName.nativeElement.value = data.name;
  }

  chooseSong(data: string) {
    this.songName.nativeElement.value = data;
  }

  get songNameValue(): string | undefined {
    return this.songName.nativeElement.value;
  }

  get artistNameValue(): string | undefined {
    return this.artistName.nativeElement.value;
  }

  get lifes() {
    return this.gameService.game.lifes;
  }
}
