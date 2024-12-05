import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { IGame } from '@avans-nx-workshop/shared/api';
import { GameService } from '../game.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'avans-nx-workshop-game-list',
    templateUrl: './game-list.component.html',
    styles: ``
})
export class GameListComponent implements OnInit, OnDestroy {
    games?: IGame[];
    sub?: Subscription;
    constructor(private gameService: GameService, private rout: Router, private actRoute: ActivatedRoute) {}


    ngOnInit(): void {
        console.log('GameListComponent ngOnInit');
        this.sub = this.gameService.getGamesAsync().subscribe((games) => {
            const currentDate = new Date();
            const url = this.actRoute.snapshot.url.join('/');
            if (url === 'games') {
                this.games = games.filter(game => new Date(game.date) > currentDate);
            } else if (url === 'playedgames') {
                this.games = games.filter(game => new Date(game.date) <= currentDate);
            }
        });
    }

    ngOnDestroy(): void {
        console.log('GameListComponent ngOnDestroy');
        this.sub?.unsubscribe();
    }

    navigateToPlayersForGame(gameId: string): void {
        this.rout.navigate(['/players'], { queryParams: { gameId: gameId } });
    }
    
}
