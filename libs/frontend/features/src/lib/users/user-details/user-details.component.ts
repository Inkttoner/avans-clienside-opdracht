import { Component, OnInit } from '@angular/core';
import { IUserInfo } from '@avans-nx-workshop/shared/api';
import { ActivatedRoute } from '@angular/router';
import { UserService } from'../user.sevice';


@Component({
    selector: 'avans-nx-workshop-user-details',
    templateUrl: './user-details.component.html',
    styles: []
})
export class UserDetailsComponent implements OnInit {
    userId: string | null = null;
    user: IUserInfo | null = null;

    constructor(
        private userService: UserService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
        this.userId = params.get('id');
        this.user = this.userService.getUserById(String(this.userId));    
    });

    };


}
