import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountdownService {
  needsRestart = new BehaviorSubject(false);
  isLoaded = new BehaviorSubject(false);
}
