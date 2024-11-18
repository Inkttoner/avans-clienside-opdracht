import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUserInfo } from '@avans-nx-workshop/shared/api';
import{ UserService} from '../user.sevice';
import { Subscription } from 'rxjs';



@Component({
    selector: 'avans-nx-workshop-user-list',
    templateUrl: './user-list.component.html',
    styles: []
})
export class UserListComponent implements OnInit, OnDestroy {
    users?: IUserInfo[] 
    sub?: Subscription;
    constructor(private userService: UserService) { }

    ngOnInit(): void {
        // this.users= this.userService.getUsers(); 
        this.sub = this.userService.getUsersAsync().subscribe((users) => {
            this.users = users;
        });
    }
    
    ngOnDestroy(): void {
        this.sub?.unsubscribe();
    }

}