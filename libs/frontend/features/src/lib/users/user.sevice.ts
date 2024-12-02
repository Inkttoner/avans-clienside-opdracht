import { Injectable } from '@angular/core';
import { Observable, of, delay, map } from 'rxjs';
import {
    IUserInfo,
    UserGender,
    UserRole,
    ApiResponse
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

    getUsersAsync(): Observable<IUserInfo[]> {
        console.log('getUsersAsync aangeroepen');
        return this.http
            .get<ApiResponse<any>>(`${environment.dataApiUrl}/user`)
            .pipe(map((response) => response.results));
    }
    getUserById(_id: string): Observable<IUserInfo>{
      console.log('getUserById aangeroepen');
      return this.http
          .get<ApiResponse<any>>(`${environment.dataApiUrl}/user/${_id}`)
          .pipe(map((response) => response.results));
    }
}
