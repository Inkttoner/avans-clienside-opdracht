import { Injectable } from '@angular/core';
import { Observable, of, delay, map } from 'rxjs';
import {
    IPlayer,
    IGame,
    ApiResponse,
    IUser,
    IUserRegistration,
    IReport,
    ICreateReport
} from '@avans-nx-workshop/shared/api';
import { environment } from '@avans-nx-workshop/shared/util-env';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ReportService {
    constructor(private http: HttpClient) {
        console.log('Service constructor aangeroepen');
    }

    getAuthHeaders(): { [key: string]: string } {
        const currentUser = JSON.parse(localStorage.getItem('currentuser') || '{}');
        const token = currentUser?.token || '';
        return {
            Authorization: `Bearer ${token}`
        };
    }

    getReportByGameId(gameId: string): Observable<IReport>{
        console.log('getReportById aangeroepen', gameId);
        return this.http
            .get<ApiResponse<any>>(`${environment.dataApiUrl}/game/${gameId}/report`)
            .pipe(map((response) => response.results));
      }

    createReport(report: ICreateReport): Observable<ICreateReport> {
        const headers = this.getAuthHeaders();
        console.log('headers', headers)
        console.log('createReport aangeroepen', report);
        return this.http
            .post<ApiResponse<any>>(`${environment.dataApiUrl}/report`, report, {headers})
            .pipe(map((response) => response.results));
    }
}
