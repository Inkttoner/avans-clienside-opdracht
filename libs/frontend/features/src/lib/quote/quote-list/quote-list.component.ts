import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { QuoteService } from '../quote.service';
import { IQuote } from '@avans-nx-workshop/shared/api';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'avans-nx-workshop-quote-list',
    templateUrl: './quote-list.component.html',
    styles: ``
})
export class QuoteListComponent implements OnInit, OnDestroy {
    sub?: Subscription;
    quotes: IQuote[] = [];
    userID: string = '';
    

    constructor(private quoteService: QuoteService, private auth: AuthService) {
        console.log('QuoteListComponent constructor');
    }

    ngOnInit(): void {
        this.sub = this.quoteService.getQuotesAsync().subscribe((quotes) => {
            console.log('Quotes:', quotes);
            this.quotes = quotes; // Each quote now includes an 'author' field
            this.auth.currentUser$.subscribe((user) => {
                if (user) {
                    this.userID = user._id;
                }
            });
            console.log('User ID:', this.userID);
        });
    }

    likeQuote(quoteId: string): void {
        const userId = this.userID;
        this.quoteService.likeQuote(quoteId, userId).subscribe((quote) => {
            // Update the local quotes array with the liked quote
            const index = this.quotes.findIndex(q => q.id === quote.id);
            if (index !== -1) {
                this.quotes[index] = quote;
            }
        });
    }

    dislikeQuote(quoteId: string): void {
        const userId = this.userID;
        this.quoteService.dislikeQuote(quoteId, userId).subscribe((quote) => {
            // Update the local quotes array with the disliked quote
            const index = this.quotes.findIndex(q => q.id === quote.id);
            if (index !== -1) {
                this.quotes[index] = quote;
            }
        });
    }

    ngOnDestroy(): void {
       this.sub?.unsubscribe();
    }
}
