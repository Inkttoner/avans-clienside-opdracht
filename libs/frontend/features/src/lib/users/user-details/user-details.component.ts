import { Component, OnDestroy, OnInit } from '@angular/core';
import { IPlayer } from '@avans-nx-workshop/shared/api';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.sevice';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'avans-nx-workshop-user-details',
    templateUrl: './user-details.component.html',
    styles: []
})
export class UserDetailsComponent implements OnInit, OnDestroy {
    user?: IPlayer;
    subscription?: Subscription;
    canEdit = false;

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private auth: AuthService
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            const userId = params.get('id');
            this.subscription = this.userService
                .getUserById(String(userId))
                .subscribe((user) => {
                    this.user = user;
                    this.auth.userMayEdit(user._id).subscribe((canEdit) => {
                        this.canEdit = canEdit;})
                });
        });
    }
    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }
}
