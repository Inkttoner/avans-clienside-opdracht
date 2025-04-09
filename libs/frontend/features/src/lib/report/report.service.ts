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


    getReportById(_id: string): Observable<IReport>{
        console.log('getReportById aangeroepen');
        return this.http
            .get<ApiResponse<any>>(`${environment.dataApiUrl}/report/${_id}`)
            .pipe(map((response) => response.results));
      }

    createReport(report: ICreateReport): Observable<ICreateReport> {
        console.log('createReport aangeroepen');
        return this.http
            .post<ApiResponse<any>>(`${environment.dataApiUrl}/report`, report)
            .pipe(map((response) => response.results));
    }
}
