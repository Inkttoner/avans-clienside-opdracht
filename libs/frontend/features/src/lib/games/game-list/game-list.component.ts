import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { IGame, IUser, UserRole } from '@avans-nx-workshop/shared/api';
import { GameService } from '../game.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'avans-nx-workshop-game-list',
    templateUrl: './game-list.component.html',
    styles: ``
})
export class GameListComponent implements OnInit, OnDestroy {
    games?: IGame[];
    sub?: Subscription;
    isAdmin = false;
    constructor(
        private gameService: GameService,
        private rout: Router,
        private actRoute: ActivatedRoute,
        private auth: AuthService
    ) {}

    ngOnInit(): void {
        console.log('GameListComponent ngOnInit');
        this.sub = this.auth.currentUser$.subscribe((user: IUser | undefined) => {
            if (user) {
                this.isAdmin = user.role === UserRole.Admin;
                console.log('isAdmin = ', this.isAdmin);
            }
        });
        this.sub = this.gameService.getGamesAsync().subscribe((games) => {
            const currentDate = new Date();
            const url = this.actRoute.snapshot.url.join('/');
            if (url === 'games') {
                this.games = games
                    .filter((game) => new Date(game.date) > currentDate)
                    .sort(
                        (a, b) =>
                            new Date(a.date).getTime() -
                            new Date(b.date).getTime()
                    );
            } else if (url === 'playedgames') {
                this.games = games
                    .filter((game) => new Date(game.date) <= currentDate)
                    .sort(
                        (a, b) =>
                            new Date(b.date).getTime() -
                            new Date(a.date).getTime()
                    );
            }
        });
        console.log(this.isAdmin);
    }

    ngOnDestroy(): void {
        console.log('GameListComponent ngOnDestroy');
        this.sub?.unsubscribe();
    }

    navigateToPlayersForGame(gameId: string): void {
        this.rout.navigate(['/players'], { queryParams: { gameId: gameId } });
    }

    navigateToEditGame(gameId: string): void {
        this.rout.navigate(['/game-edit', gameId]);
    }
}
