import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';

@NgModule({
    imports: [CommonModule],
    declarations: [UserDetailsComponent, UserListComponent, UserEditComponent],
    exports: [UserDetailsComponent, UserListComponent]
})
export class FeaturesModule {}
