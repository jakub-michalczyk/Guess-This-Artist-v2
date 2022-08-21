import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
export class GuessScreenComponent implements OnInit, OnDestroy {
  constructor(
    private activatedRoute: ActivatedRoute,
    private gameService: GameService,
    private requestService: RequestService,
    private router: Router
  ) {}

  timerObj: Timer = {
    minutes: 0,
    seconds: 30,
  };
  hideLoading = false;
  artist = ARTISTS;
  timerInterval = 0;
  guessed = false;
  private track = new Audio();
  trackData = {} as TrackData;
  fields: GuessField[] = [
    { type: 'artist', data: [] },
    { type: 'song', data: [] },
  ];
  @Input() countdownEnded = false;
  artistData = {} as Artist;
  @ViewChild('artistName') artistName!: ElementRef<HTMLInputElement>;
  @ViewChild('songName') songName!: ElementRef<HTMLInputElement>;
  @ViewChild('imageContainer') imageContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('progressTrack') progressTrack!: ElementRef<HTMLDivElement>;
  @ViewChild('gameOver') gameOverOverlayer!: ElementRef<HTMLDivElement>;

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

  ngOnDestroy(): void {
    this.track.pause();
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
        let isError = songs as ErrorFallback;

        if (isError.error) {
          return this.validateSongs(data);
        } else {
          let songsData = songs as SongsData;
          songsData.data.forEach((song) => {
            if (!data.includes(song.title)) {
              data.push(song.title);
            }
          });
        }
      });
    });
  }

  validateArtists(data: Artist[]) {
    this.artist.forEach((artist) => {
      if (this.artistNameValue) {
        if (
          artist.name
            .toLowerCase()
            .includes(this.artistNameValue.toLowerCase()) ||
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
      this.artistNameValue?.toLowerCase() ===
        this.artistData.name.toLowerCase() &&
      this.songNameValue?.toLowerCase() === this.trackData.title.toLowerCase()
    ) {
      this.correctGuess();
    } else {
      let failureSound = new Audio();
      let lifes = this.gameService.game.lifes;
      let length = this.gameService.game.lifes.length;

      failureSound.src = 'assets/audio/failure.mp3';

      for (let i = length - 1; i >= 0; i--) {
        if (lifes[i].exists) {
          lifes[i].exists = false;
          break;
        }
      }

      failureSound.play();

      if (this.lifes.every((life) => !life.exists)) {
        return this.gameOver();
      }
    }
  }

  gameOver() {
    this.stopGame('/assets/audio/gameover.mp3');
    this.guessed = false;
    this.gameOverOverlayer.nativeElement.className +=
      ' game-over-overlayer-full';
  }

  stopGame(audioSrc: string) {
    let audio = new Audio();

    audio.src = audioSrc;
    audio.play();
    window.clearInterval(this.timerInterval);

    this.guessed = true;
    this.track.pause();
    this.progressTrack.nativeElement.style.width = `${this.progressTrack.nativeElement.clientWidth}px`;
    this.progressTrack.nativeElement.classList.remove('progress-running');
  }

  correctGuess() {
    this.stopGame('assets/audio/correct.mp3');
    this.imageContainer.nativeElement.style.backgroundImage = `url(${this.moreArtistData.image})`;
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

  get moreArtistData() {
    return this.artist.find((artist) => artist.name === this.artistData.name)!;
  }
}
