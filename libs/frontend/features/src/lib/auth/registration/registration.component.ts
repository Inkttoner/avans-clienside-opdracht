import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { UserService, AuthService  } from '@avans-nx-workshop/features';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from '@avans-nx-workshop/shared/util-env';
import {IUserRegistration } from '@avans-nx-workshop/shared/api';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'avans-nx-workshop-registration',
    templateUrl: './registration.component.html',
    styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit, OnDestroy {
    registerForm: FormGroup;
    subscription?: Subscription;
    
    constructor(private http: HttpClient, private authService: AuthService, private router: Router) {
        console.log('RegistrationComponent constructor aangeroepen');
        this.registerForm = new FormGroup({
            name: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required, this.validPassword.bind(this)]),
            emailAddress: new FormControl('', [Validators.required, this.validEmail.bind(this)]),
            dateOfBirth: new FormControl('', [Validators.required])
        });
    }
    ngOnInit(): void {
        console.log('RegistrationComponent ngOnInit aangeroepen');
    }
    ngOnDestroy(): void {
        console.log('RegistrationComponent ngOnDestroy aangeroepen');
    }

    register(){
        if (this.registerForm.valid) {
            this.authService.register(this.registerForm.value).subscribe((user) => {
              if (user) {
                console.log('user = ', user);
                this.router.navigate(['/login']);
              }
            });
          } else {
            console.error('registerForm invalid');
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
        const regexp = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$');
        const test = regexp.test(password);
        if (regexp.test(password) !== true) {
          return { password: false };
        } else {
          return null;
        }
      }
         
}
