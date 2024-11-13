import { Route } from '@angular/router';
import { UserListComponent } from 'libs/frontend/features/src/lib/users/user-list/user-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const appRoutes: Route[] = [
    {path: '', component: DashboardComponent},
    {path: 'users', component: UserListComponent},
];
