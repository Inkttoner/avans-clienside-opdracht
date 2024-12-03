import { Component, OnDestroy, OnInit } from '@angular/core';
import { IPlayer } from '@avans-nx-workshop/shared/api';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.sevice';
import { Subscription } from 'rxjs';

@Component({
    selector: 'avans-nx-workshop-user-details',
    templateUrl: './user-details.component.html',
    styles: []
})
export class UserDetailsComponent implements OnInit, OnDestroy {
    user?: IPlayer;
    subscription?: Subscription;

    constructor(
        private userService: UserService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            const userId = params.get('id');
            this.subscription = this.userService
                .getUserById(String(userId))
                .subscribe((user) => {
                    this.user = user;
                });
        });
    }
    ngOnDestroy(): void {}
}
