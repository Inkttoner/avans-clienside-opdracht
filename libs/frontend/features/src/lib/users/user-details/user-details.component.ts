import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUserInfo } from '@avans-nx-workshop/shared/api';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.sevice';

@Component({
    selector: 'avans-nx-workshop-user-details',
    templateUrl: './user-details.component.html',
    styles: []
})
export class UserDetailsComponent implements OnInit, OnDestroy {
    user?: IUserInfo 

    constructor(
        private userService: UserService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            var userId = params.get('id');
            this.user = this.userService.getUserById(String(userId));
        });
    }
    ngOnDestroy(): void {
        
    }
}
