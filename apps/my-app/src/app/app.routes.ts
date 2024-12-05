import { Route } from '@angular/router';
import {
    UserListComponent,
    UserDetailsComponent,
    GameListComponent,
    LoginComponent,
    RegistrationComponent,
    UserEditComponent,
    AdminComponent
} from '@avans-nx-workshop/features';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AboutComponent } from './components/about/about.component';
import { AdminGuard, LoggedInAuthGuard, UserEditGuard } from 'libs/frontend/features/src/lib/auth/auth.guard';

export const appRoutes: Route[] = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'users', canActivate:[LoggedInAuthGuard], component: UserListComponent },
    { path: 'about', component: AboutComponent },
    { path: 'users/:id', component: UserDetailsComponent },
    { path: 'games', component: GameListComponent },
    {path: 'playedgames', component: GameListComponent},
    { path: 'players', component: UserListComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegistrationComponent },
    {path: 'users/:id/edit', canActivate:[UserEditGuard], component: UserEditComponent},
    {path: 'admin', canActivate:[AdminGuard], component: AdminComponent},

    { path: '**', redirectTo: 'dashboard' }
];
