import { Component, OnInit } from '@angular/core';
import { UserService, IUserInfo } from '@avans-nx-workshop/shared/api';


@Component({
    selector: 'avans-nx-workshop-user-list',
    templateUrl: './user-list.component.html',
    styles: []
})
export class UserListComponent implements OnInit {
    users: IUserInfo[] = [];
    constructor(private userService: UserService) { }

    ngOnInit(): void {
        this.users= this.userService.getUsers(); 
    }
    

}