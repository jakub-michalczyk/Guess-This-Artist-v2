import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ARTISTS } from './artists';
import { GameService } from './game.service';
import { Artist } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private http: HttpClient, private gameService: GameService) {}
  artist = ARTISTS;

  getTrack(): Observable<Object> {
    const options = {
      method: 'GET',
      url: 'https://deezerdevs-deezer.p.rapidapi.com/artist/13',
      headers: {
        'X-RapidAPI-Key': '9bbbd5d1fdmsh679c0fcf703b1dfp13fd49jsn64d8ba2c1463',
        'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
      },
    };

    //Default setting
    let artist = this.filteredArtists;
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

  get filteredArtists(): Artist {
    let artistData = {} as Artist;
    if (this.gameService.game.artist === 'Random') {
      let artistDataArr = this.artist.slice(1).filter((artist) => {
        if (
          artist.genre?.includes(this.gameService.game.genre) &&
          artist.nationality === this.gameService.game.nationality
        ) {
          return artist;
        } else {
          return undefined;
        }
      });

      return artistDataArr[Math.floor(Math.random() * artistDataArr.length)];
    } else {
      artistData = this.artist.find(
        (artist) =>
          artist.name.toLowerCase() ===
          this.gameService.game.artist.toLowerCase()
      )!;
    }

    return artistData;
  }
}
