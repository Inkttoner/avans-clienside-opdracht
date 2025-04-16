import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { QuoteService } from '../quote.service';
import { IQuote, IUser, UserRole } from '@avans-nx-workshop/shared/api';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../users/user.sevice';

@Component({
    selector: 'avans-nx-workshop-quote-list',
    templateUrl: './quote-list.component.html',
    styles: ``
})
export class QuoteListComponent implements OnInit, OnDestroy {
    sub?: Subscription;
    quotes: IQuote[] = [];
    userID: string = '';
    isAdmin: boolean = false;
    isCreateQuote: boolean = false;
    users?: IUser[] = [];
    newQuoteText: string = '';
    selectedUserId: string = '';
    

    constructor(private quoteService: QuoteService, private auth: AuthService, private userService: UserService) {
        console.log('QuoteListComponent constructor');
    }

    ngOnInit(): void {
        this.sub = this.quoteService.getQuotesAsync().subscribe((quotes) => {
            console.log('Quotes:', quotes);
            this.quotes = quotes; // Each quote now includes an 'author' field
            this.auth.currentUser$.subscribe((user) => {
                if (user) {
                    this.userID = user._id;
                    this.isAdmin = user.role === UserRole.Admin; // Check if the user is an admin
                }
            });
            this.userService.getUsersAsync().subscribe((users) => {
                this.users = users;
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
    
    createQuote(): void {
        if (!this.newQuoteText.trim()) {
            return; // Prevent creating empty quotes
        }
        this.quoteService.createQuote(this.selectedUserId, this.newQuoteText).subscribe((newQuote) => {
            this.quotes.push(newQuote); // Add the new quote to the list
            this.newQuoteText = ''; // Clear the input field
        });
    }

    toggleCreateQuote(): void {
        this.isCreateQuote = !this.isCreateQuote;
    }

    ngOnDestroy(): void {
       this.sub?.unsubscribe();
    }
}
