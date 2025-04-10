import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../game.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { IGame, IPlayer } from '@avans-nx-workshop/shared/api';
import { Subscription } from 'rxjs';
import { UserService } from '../../users/user.sevice';

@Component({
    selector: 'avans-nx-workshop-game-detail',
    templateUrl: './game-detail.component.html',
    styles: ``
})

export class GameDetailComponent implements OnInit, OnDestroy {
    game?: IGame ;
    subscription?: Subscription;
    player?: IPlayer;
    isRegistered: boolean = false;

    constructor(private gameService: GameService, private route: ActivatedRoute, private auth: AuthService, private userService: UserService) { }
    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            const gameId = params.get('id');
            this.subscription = this.gameService.getGameById(String(gameId)).subscribe((game) => {
                this.game = game;
            });
        });
        this.auth.currentUser$.subscribe((user) => {
            if (!user) {
                return;
            }
            this.userService.getUserById(user._id).subscribe((player) => {
                this.player = player;
                this.checkRegistration();
            });
        });
    }

    checkRegistration(): void {
        if (!this.game || !this.player) {
            alert('Game of speler informatie ontbreekt.');
            return;
        }
        this.isRegistered = this.game.players.some((p) => p._id === this.player?._id);
    }

    registerForMatch(): void {
        console.log('registerForMatch aangeroepen', this.player);
        if (!this.game || !this.player) {
            alert('Game or player information is missing.');
            return;
        }
        this.gameService.addPlayerToGame(this.game._id, this.player).subscribe((response) => {
            if (response) {
                alert('Je bent geregistreerd voor de wedstrijd.');
                this.isRegistered = true;
            } else {
                alert('Er is een fout opgetreden bij het registreren voor de wedstrijd.');
            }
        });
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

}
