import { Injectable } from '@angular/core';
import { Observable, of, delay, map } from 'rxjs';
import {
    IGame,
    ApiResponse
} from '@avans-nx-workshop/shared/api';
import { environment } from '@avans-nx-workshop/shared/util-env';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class GameService {
    constructor(private http: HttpClient) {
        console.log('Service constructor aangeroepen');
    }


    getGamesAsync(): Observable<IGame[]> {
        console.log('getGamesAsync aangeroepen');
        return this.http
            .get<ApiResponse<any>>(`${environment.dataApiUrl}/game`)
            .pipe(map((response) => response.results));
    }
    getGameById(_id: string): Observable<IGame>{
      console.log('getGameById aangeroepen');
      return this.http
          .get<ApiResponse<any>>(`${environment.dataApiUrl}/game/${_id}`)
          .pipe(map((response) => response.results));
    }
}
