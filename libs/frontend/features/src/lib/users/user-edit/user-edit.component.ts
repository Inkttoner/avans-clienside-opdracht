import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { UserService, AuthService } from '@avans-nx-workshop/features';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from '@avans-nx-workshop/shared/util-env';
import { IPlayer } from '@avans-nx-workshop/shared/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'avans-nx-workshop-user-edit',
    templateUrl: './user-edit.component.html',
    styles: []
})
export class UserEditComponent {
    updateForm: FormGroup;
    subscription?: Subscription;
    user?: IPlayer;

    constructor(
        private router: Router,
        private userService: UserService,
        private route: ActivatedRoute
    ) {
        console.log('RegistrationComponent constructor aangeroepen');
        this.updateForm = new FormGroup({
            name: new FormControl('', [Validators.required]),
            emailAddress: new FormControl('', [
                Validators.required,
                this.validEmail.bind(this)
            ]),
            dateOfBirth: new FormControl('', [Validators.required]),
            position: new FormControl('', [Validators.required])
        });
    }
    ngOnInit(): void {
        console.log('RegistrationComponent ngOnInit aangeroepen');
        const userId = this.route.snapshot.paramMap.get('id');
        if (userId) {
            this.subscription = this.userService
                .getUserById(userId)
                .subscribe((user) => {
                    console.log('User:', user);
                    this.user = user;
                    const dateOfBirth = this.formatDate(String(user.dateOfBirth));
                    this.updateForm.patchValue({
                        name: user.name,
                        emailAddress: user.emailAddress,
                        dateOfBirth: dateOfBirth,
                        position: user.position,
                    });
                });
        }
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    onSubmit(): void {
        if (this.updateForm.valid) {
            const updatedUser = this.updateForm.value;

            this.userService
                .updateUser(this.user?._id, updatedUser)
                .subscribe(() => {
                    // Update local storage with new user data
                    const updatedUserData = { ...this.user, ...updatedUser };
                    localStorage.setItem(
                        'currentUser',
                        JSON.stringify(updatedUserData)
                    );
                    this.router.navigate(['/users', this.user?._id]);
                });
        }
    }

    delete(): void {
        if (this.user) {
            this.userService.deleteUser(this.user._id).subscribe(() => {
                this.router.navigate(['/users']);
            });
        }
    }

    validEmail(control: FormControl): { [s: string]: boolean } | null {
        const email = control.value;
        const regexp = new RegExp(
            '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'
        );
        if (regexp.test(email) !== true) {
            return { email: false };
        } else {
            return null;
        }
    }

    validPassword(control: FormControl): { [s: string]: boolean } | null {
        const password = control.value;
        const regexp = new RegExp(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
        );
        const test = regexp.test(password);
        if (regexp.test(password) !== true) {
            return { password: false };
        } else {
            return null;
        }
    }
    private formatDate(dateString: string): string {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    }
}
