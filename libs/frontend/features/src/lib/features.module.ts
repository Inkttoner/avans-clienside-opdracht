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
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { GameDetailComponent } from './games/game-details/game-detail.component';
import { ReportDetailComponent } from './report/report-detail/report-detail.component';
import { CreateReportComponent } from './report/create-report/create-report.component';
import { GameEditComponent } from './games/game-edit/game-edit.component';
import { QuoteListComponent } from './quote/quote-list/quote-list.component';

@NgModule({
    imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
    declarations: [
        UserDetailsComponent,
        UserListComponent,
        UserEditComponent,
        GameListComponent,
        LoginComponent,
        RegistrationComponent,
        AdminComponent,
        GameDetailComponent,
        ReportDetailComponent,
        CreateReportComponent,
        GameEditComponent,
        QuoteListComponent
    ],
    providers: [LoggedInAuthGuard, UserEditGuard, AdminGuard]
})
export class FeaturesModule {}
