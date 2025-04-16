import { Component, OnDestroy, OnInit } from '@angular/core';
import { IPlayer } from '@avans-nx-workshop/shared/api';
import { UserService } from '../user.sevice';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'avans-nx-workshop-user-list',
    templateUrl: './user-list.component.html',
    styles: []
})
export class UserListComponent implements OnInit, OnDestroy {
    users?: IPlayer[];
    sub?: Subscription;
    constructor(private userService: UserService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            const gameId = params['gameId'];
            if (gameId) {
                this.sub = this.userService.getPlayersForGameAsync(gameId).subscribe((users) => {
                    this.users = users;
                });
            } else {
                this.sub = this.userService.getUsersAsync().subscribe((users) => {
                    this.users = users;
                });
            }
        });
    }

    ngOnDestroy(): void {
        this.sub?.unsubscribe();
    }
}
