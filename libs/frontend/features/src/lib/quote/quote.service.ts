import { Injectable } from '@angular/core';
import { Observable, of, delay, map } from 'rxjs';
import {
    ApiResponse,
    IQuote
} from '@avans-nx-workshop/shared/api';
import { environment } from '@avans-nx-workshop/shared/util-env';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class QuoteService {
    constructor(private http: HttpClient) {
        console.log('Service constructor aangeroepen');
    }

    getQuotesAsync(): Observable<IQuote[]> {
        console.log('getQuotesAsync called');
        return this.http
            .get<ApiResponse<any>>(`${environment.rcmdApiUrl}/quotes`)
            .pipe(
                map((response) =>
                    response.results.map((quote: any) => ({
                        ...quote,
                        id: quote.quoteID,
                        text: quote.inhoud,
                        author: quote.author, 
                    }))
                )
            );
    }

    likeQuote(quoteId: string, userId: string): Observable<IQuote> {
        console.log('likeQuote aangeroepen');
        return this.http
            .post<ApiResponse<any>>(`${environment.rcmdApiUrl}/quotes/like`, {quoteId, userId})
            .pipe(map((response) => response.results));
    }

    dislikeQuote(quoteId: string, userId: string): Observable<IQuote> {
        console.log('dislikeQuote aangeroepen');
        return this.http
            .post<ApiResponse<any>>(`${environment.rcmdApiUrl}/quotes/dislike`, {quoteId, userId})
            .pipe(map((response) => response.results));
    }
}