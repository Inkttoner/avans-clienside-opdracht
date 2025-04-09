import { Component, OnDestroy, OnInit } from '@angular/core';
import { IGame } from '@avans-nx-workshop/shared/api';
import { Subscription } from 'rxjs';
import { GameService } from '../game.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
    selector: 'avans-nx-workshop-game-edit',
    templateUrl: './game-edit.component.html',
    styles: []
})
export class GameEditComponent implements OnInit, OnDestroy {
    game: IGame = {} as IGame;
    subscription?: Subscription;
    dateString: string = '';
    
    constructor(
        private gameService: GameService,
        private route: ActivatedRoute,
        private router: Router
    ) {}


    ngOnInit(): void {
        const gameId = this.route.snapshot.paramMap.get('gameId');
        if (gameId) {
            this.gameService.getGameById(gameId).subscribe((game) => {
                if (game.date) {
                    const date = new Date(game.date);
                    this.dateString = date.toISOString().slice(0, 10); // Format as YYYY-MM-DD
                }
                this.game = game;
            });
        }
    }
    
    submitGameDetails(): void {
        // Check if timeToGather and time are in the format hh:mm
        const timeRegex = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;
        if (!timeRegex.test(this.game.timeToGather)) {
            alert('Verzameltijd moet in het formaat 00:00 zijn.');
            return;
        }
        if (!timeRegex.test(this.game.time)) {
            alert('Tijd moet in het formaat 00:00 zijn.');
            return;
        }
    
        // Check if the date is not earlier than the current date
        const selectedDate = new Date(this.dateString);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); // Reset time to midnight for comparison
        if (selectedDate < currentDate) {
            alert('De datum mag niet eerder zijn dan vandaag.');
            return;
        }
    
        // Check if the fee is not negative
        if (this.game.fee < 0) {
            alert('De vergoeding mag niet negatief zijn.');
            return;
        }
    
        // Revert the dateString back to game.date
        this.game.date = new Date(this.dateString);
        console.log('Game details:', this.game);
        // Check if the game object is valid
        
        // Proceed with updating the game
        this.gameService.updateGame(this.game?._id, this.game).subscribe(
            () => {
                console.log('Game updated successfully');
                this.router.navigate(['/games']);
            },
            (error) => {
                console.error('Error updating game:', error);
            }
        );
    }
    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }
}