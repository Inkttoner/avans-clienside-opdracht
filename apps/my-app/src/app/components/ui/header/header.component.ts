import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '@avans-nx-workshop/features';
import { Subscription } from 'rxjs';
import { IUser } from '@avans-nx-workshop/shared/api';


@Component({
    selector: 'avans-nx-workshop-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    subscription!: Subscription;
    isLoggedIn = false;
    constructor(private auth: AuthService) {
        console.log('HeaderComponent constructor aangeroepen');
    }

    ngOnInit(): void {
        console.log('HeaderComponent ngOnInit aangeroepen');
        this.subscription = this.auth.currentUser$.subscribe((user: IUser | undefined) => {
            this.isLoggedIn = !!user;
            console.log(this.isLoggedIn);
        });
    }
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
        
    }

    logout(): void {
        this.auth.logout();
    }
    
}
