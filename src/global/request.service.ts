import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Artist } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private http: HttpClient) {}

  getTrack(artistData: Artist[]): Observable<Object> {
    const options = {
      method: 'GET',
      url: 'https://deezerdevs-deezer.p.rapidapi.com/artist/13',
      headers: {
        'X-RapidAPI-Key': '9bbbd5d1fdmsh679c0fcf703b1dfp13fd49jsn64d8ba2c1463',
        'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
      },
    };

    //Default setting
    let artist =
      artistData.slice(1)[Math.floor(Math.random() * (artistData.length - 1))];
    let url = `https://deezerdevs-deezer.p.rapidapi.com/artist/${artist.id}/top?limit=150`;
    return this.http.get(url, options).pipe(catchError(this.erroHandler));
  }

  async getSimiliarSongs(query: string | undefined) {
    if (query) {
      const options = {
        method: 'GET',
        url: 'https://deezerdevs-deezer.p.rapidapi.com/search',
        params: { q: query },
        headers: {
          'X-RapidAPI-Key':
            '9bbbd5d1fdmsh679c0fcf703b1dfp13fd49jsn64d8ba2c1463',
          'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
        },
      };
      let url = `https://deezerdevs-deezer.p.rapidapi.com/search`;

      return await this.http
        .get(url, options)
        .pipe(catchError(this.erroHandler));
    }

    return undefined;
  }

  erroHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'server Error');
  }
}
