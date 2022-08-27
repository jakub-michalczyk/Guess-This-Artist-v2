import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CountdownService } from 'src/global/countdown.service';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
})
export class CountdownComponent implements OnInit {
  countdown = 3;
  countdownInterval = 0;
  flag = false;
  @ViewChild('countdownRef') countdownRef!: ElementRef<HTMLDivElement>;
  @ViewChild('overlayerRef') overlayerRef!: ElementRef<HTMLDivElement>;
  @Output() countdownEnded = new EventEmitter<boolean>();
  constructor(
    private renderer: Renderer2,
    private countdownService: CountdownService
  ) {}

  ngOnInit(): void {
    this.countdownService.needsRestart.subscribe((restart) => {
      if (restart) {
        this.countdown = 3;
        this.flag = false;
        this.renderer.appendChild(
          this.overlayerRef.nativeElement,
          this.countdownRef.nativeElement
        );
      } else {
        return this.init();
      }
    });
  }

  init() {
    this.countdownService.isLoaded.subscribe((loaded) => {
      if (loaded) {
        this.countdownService.isLoaded.next(false);
        let audio = new Audio();
        audio.src = '/assets/audio/countdown.mp3';
        audio.play();
        this.countdownInterval = window.setInterval(() => {
          if (this.countdown <= 0) {
            if (
              this.overlayerRef.nativeElement &&
              this.countdownRef.nativeElement
            ) {
              this.renderer.removeChild(
                this.overlayerRef.nativeElement,
                this.countdownRef.nativeElement
              );
            }

            setTimeout(() => {
              this.flag = true;
              this.countdownEnded.emit(true);
            }, 20);

            return window.clearInterval(this.countdownInterval);
          }
          this.countdown -= 1;
        }, 2000);
      }
    });
  }
}
