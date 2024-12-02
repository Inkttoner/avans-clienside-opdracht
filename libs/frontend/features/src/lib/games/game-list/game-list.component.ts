import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { IGame } from '@avans-nx-workshop/shared/api';
import { GameService } from '../game.service';

@Component({
    selector: 'avans-nx-workshop-game-list',
    templateUrl: './game-list.component.html',
    styles: ``
})
export class GameListComponent implements OnInit, OnDestroy {
    games?: IGame[];
    sub?: Subscription;
    constructor(private gameService: GameService) {}

    ngOnInit(): void {
        console.log('GameListComponent ngOnInit');
        this.sub = this.gameService.getGamesAsync().subscribe((games) => {
            this.games = games;
        });
    }

    ngOnDestroy(): void {
        console.log('GameListComponent ngOnDestroy');
        this.sub?.unsubscribe();
    }
}
