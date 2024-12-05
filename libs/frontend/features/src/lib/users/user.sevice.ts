import { Injectable } from '@angular/core';
import { Observable, of, delay, map } from 'rxjs';
import {
    IPlayer,
    IGame,
    ApiResponse,
    IUser,
    IUserRegistration
} from '@avans-nx-workshop/shared/api';
import { environment } from '@avans-nx-workshop/shared/util-env';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) {
        console.log('Service constructor aangeroepen');
    }

 

    getPlayersForGameAsync(_id: string): Observable<IPlayer[]> {
        console.log('getPlayersForGameAsync aangeroepen');
        return this.http
            .get<ApiResponse<any>>(`${environment.dataApiUrl}/game/players/${_id}`)
            .pipe(map((response) => response.results));
    }

    getUsersAsync(): Observable<IPlayer[]> {
        console.log('getUsersAsync aangeroepen');
        return this.http
            .get<ApiResponse<any>>(`${environment.dataApiUrl}/user`)
            .pipe(map((response) => response.results));
    }
    getUserById(_id: string): Observable<IPlayer> {
        console.log('getUserById aangeroepen');
        return this.http
            .get<ApiResponse<any>>(`${environment.dataApiUrl}/user/${_id}`)
            .pipe(map((response) => response.results));
    }

    updateUser(userId: string| undefined, user: IPlayer): Observable<IPlayer> {
        console.log('updateUser aangeroepen');
        return this.http
            .put<ApiResponse<any>>(`${environment.dataApiUrl}/user/${userId}`, user)
            .pipe(map((response) => response.results));
    }

    deleteUser(userId: string): Observable<IPlayer> {
        console.log('deleteUser aangeroepen');
        return this.http
            .delete<ApiResponse<any>>(`${environment.dataApiUrl}/user/${userId}`)
            .pipe(map((response) => response.results));
    }

    // createUser(user: IUserRegistration): Observable<IUserRegistration> {
    //     console.log('createUser aangeroepen');
    //     return this.http
    //         .post<ApiResponse<any>>(`${environment.dataApiUrl}/user`, user)
    //         .pipe(map((response) => response.results));
    // }
}
