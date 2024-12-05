import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '@avans-nx-workshop/features';
import { Subscription } from 'rxjs';
import { IUser, UserRole } from '@avans-nx-workshop/shared/api';


@Component({
    selector: 'avans-nx-workshop-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    subscription!: Subscription;
    isLoggedIn = false;
    isAdmin = false;
    userId: string | undefined;
    constructor(private auth: AuthService) {
        console.log('HeaderComponent constructor aangeroepen');
    }

    ngOnInit(): void {
        console.log('HeaderComponent ngOnInit aangeroepen');
        this.subscription = this.auth.currentUser$.subscribe((user: IUser | undefined) => {
            this.isLoggedIn = !!user;
            this.userId = user?._id;
            console.log(this.isLoggedIn);
            if (user) {
                this.isAdmin = user.role === UserRole.Admin;
            }
        });
    }
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
        
    }

    logout(): void {
        this.auth.logout();
        this.isLoggedIn = false;
        this.isAdmin = false;
    }
    
}
