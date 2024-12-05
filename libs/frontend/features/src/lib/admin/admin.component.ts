import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IGame } from '@avans-nx-workshop/shared/api';
import { GameService } from '../games/game.service';
import { Router } from '@angular/router';

@Component({
    selector: 'avans-nx-workshop-admin',
    templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit, OnDestroy {
    createGameForm: FormGroup;
    game?:IGame;

    constructor(private gameService: GameService, private router:Router) {
        console.log('AdminComponent constructor aangeroepen');
        this.createGameForm = new FormGroup({
            date: new FormControl('', [Validators.required]),
            opponent: new FormControl('', [Validators.required]),
            isHomeGame: new FormControl('', [Validators.required]),
            fee: new FormControl(0, [Validators.required]),
            time: new FormControl('', [Validators.required]),
            timeToGather: new FormControl('', [Validators.required]),
        });
    }

    ngOnInit(): void {
        console.log('AdminComponent ngOnInit aangeroepen');
    }

    ngOnDestroy(): void {
        console.log('AdminComponent ngOnDestroy aangeroepen');
    }

    onSubmit(): void {
        console.log('AdminComponent onSubmit aangeroepen');
        const formValues = this.createGameForm.value;
        console.log('formValues = ', formValues);
        const newGame: IGame = {
            ...formValues,
            date: new Date(formValues.date),
            fee: Number(formValues.fee),
            isHomeGame: formValues.isHomeGame === 'true',
        }
        console.log('newGame = ', newGame);
        this.gameService.createGame(newGame).subscribe((game) => {
            if (game) {
                console.log('game = ', game);
            }
        }
        );
        this.router.navigate(['/games']);
    }
}
