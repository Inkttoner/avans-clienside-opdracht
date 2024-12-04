import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AuthService } from '@avans-nx-workshop/features';
import { IUser } from '@avans-nx-workshop/shared/api';

@Component({
    selector: 'avans-nx-workshop-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  submitted= false;
  subscription!: Subscription;

  constructor(private router: Router , private auth: AuthService) {
    console.log('LoginComponent constructor aangeroepen');
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, this.validEmail.bind(this)]),
      password: new FormControl(null, [Validators.required, this.validPassword.bind(this)])
    });
  }
  
  
  ngOnInit(): void {
    console.log('LoginComponent ngOnInit aangeroepen');
    
    this.subscription = this.auth.getUserFromLocalStorage().subscribe((user: IUser | undefined) => {
      if (user) {
        console.log('User already logged in');
        this.router.navigate(['/']);
      }
    });
  }

  ngOnDestroy(): void {
    console.log('LoginComponent ngOnDestroy aangeroepen');
    this.subscription.unsubscribe();
  }
 
  onSubmit(): void {
  console.log('LoginComponent onSubmit aangeroepen');
    if (this.loginForm.valid) {
      this.submitted = true;
      const emailAddress = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      this.auth.login(emailAddress, password).subscribe((user) => {
        if (user) {
          console.log('Logged in');
          console.log ('User:', user);
          this.router.navigate(['/']);
        }
        this.submitted = false;
      });
  } else {
    this.submitted = false;
    console.error('loginForm invalid');
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
    const regexp = new RegExp('^[a-zA-Z]([a-zA-Z0-9]){2,14}');
    const test = regexp.test(password);
    if (regexp.test(password) !== true) {
      return { password: false };
    } else {
      return null;
    }
  }
  
}