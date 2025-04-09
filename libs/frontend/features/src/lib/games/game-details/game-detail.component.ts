import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../game.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { IGame } from '@avans-nx-workshop/shared/api';
import { Subscription } from 'rxjs';

@Component({
    selector: 'avans-nx-workshop-game-detail',
    templateUrl: './game-detail.component.html',
    styles: ``
})
export class GameDetailComponent implements OnInit, OnDestroy {
    game?: IGame;
    subscription?: Subscription;
    constructor(private gameService: GameService, private route: ActivatedRoute, private auth: AuthService) { }
    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            const gameId = params.get('id');
            this.subscription = this.gameService.getGameById(String(gameId)).subscribe((game) => {
                this.game = game;
            });
        });

    }
    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

}
