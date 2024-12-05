import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { GameListComponent } from './games/game-list/game-list.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { AdminGuard, LoggedInAuthGuard, UserEditGuard } from './auth/auth.guard';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';

@NgModule({
    imports: [CommonModule, RouterModule, ReactiveFormsModule],
    declarations: [
        UserDetailsComponent,
        UserListComponent,
        UserEditComponent,
        GameListComponent,
        LoginComponent,
        RegistrationComponent,
        AdminComponent
    ],
    providers: [LoggedInAuthGuard, UserEditGuard, AdminGuard]
})
export class FeaturesModule {}
