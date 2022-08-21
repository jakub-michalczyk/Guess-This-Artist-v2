import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountdownService {
  needsRestart = new BehaviorSubject(false);

  restart() {
    this.needsRestart.next(true);
  }

  restarted() {
    this.needsRestart.next(false);
  }
}
