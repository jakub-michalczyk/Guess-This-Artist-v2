import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ARTISTS } from 'src/global/artists';
import { RequestService } from 'src/global/request.service';

@Injectable({ providedIn: 'root' })
export class GuessScreenResolver implements Resolve<Object> {
  artist = ARTISTS;
  constructor(private requestService: RequestService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Object> | Promise<Object> | Object {
    return this.requestService.getTrack(this.artist);
  }
}
