import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CountdownService } from 'src/global/countdown.service';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
})
export class CountdownComponent implements OnInit, OnDestroy {
  countdown = 3;
  countdownInterval = 0;
  flag = false;
  subscriptions: Subscription[] = [];
  @ViewChild('countdownRef') countdownRef!: ElementRef<HTMLDivElement>;
  @ViewChild('overlayerRef') overlayerRef!: ElementRef<HTMLDivElement>;
  @Output() countdownEnded = new EventEmitter<boolean>();

  constructor(
    private renderer: Renderer2,
    private countdownService: CountdownService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.countdownService.needsRestart.subscribe((restart) => {
        if (restart) {
          this.countdown = 3;
          this.flag = false;
          this.init();
        } else {
          return this.init();
        }
      })
    );
  }

  init() {
    this.subscriptions.push(
      this.countdownService.isLoaded.subscribe((loaded) => {
        if (loaded) {
          this.countdownService.isLoaded.next(false);
          let audio = new Audio();
          audio.src = '/assets/audio/countdown.mp3';
          audio.play();
          this.countdownInterval = window.setInterval(() => {
            if (this.countdown <= 0) {
              setTimeout(() => {
                this.flag = true;
                this.countdownEnded.emit(true);
              }, 20);

              return window.clearInterval(this.countdownInterval);
            }
            this.countdown -= 1;
          }, 2000);
        }
      })
    );
  }

  ngOnDestroy(){
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }
}
