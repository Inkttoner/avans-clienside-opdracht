import { Route } from '@angular/router';
import { UserListComponent } from '@avans-nx-workshop/features';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AboutComponent } from './components/about/about.component';
import { UserDetailsComponent } from '@avans-nx-workshop/features'
import { GameListComponent } from '@avans-nx-workshop/features'

export const appRoutes: Route[] = [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'users', component: UserListComponent},
    {path: 'about', component: AboutComponent},
    {path: 'users/:id', component: UserDetailsComponent},
    {path: 'games', component: GameListComponent},
    {path: 'players', component: UserListComponent},

    {path: '**', redirectTo: 'dashboard'}
];
