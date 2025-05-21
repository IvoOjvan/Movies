import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { emailValidators, passwordValidator } from '../validators';
import { SignupResponse } from '../../dtos/user.dto';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  public signupForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, emailValidators()]],
      password: ['', [Validators.required, passwordValidator()]],
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25),
        ],
      ],
    });
  }

  public onSubmit() {
    if (this.signupForm.valid) {
      console.log('Signup FOrm Submitted:', this.signupForm.value);

      const signupData = {
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        firstname: this.signupForm.value.firstName,
        lastname: this.signupForm.value.lastName,
      };

      this.http
        .post<SignupResponse>('http://localhost:5200/user/signup', signupData)
        .subscribe({
          next: (response) => {
            console.log('Signup successful:', response);
            //Store the token in localstorage
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            //ADd redirect to login page
            this.router.navigate(['/user/login']);
          },
          error: (error) => {
            console.error('Signup failed:', error);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          },
        });
    }
  }
}
