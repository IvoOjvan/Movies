import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginResponse } from '../../dtos/user.dto';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Login Form Submitted:', this.loginForm.value);

      const loginData = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };

      this.http
        .post<LoginResponse>('http://localhost:5200/user/login', loginData)
        .subscribe({
          next: (response) => {
            console.log('Login successful:', response);
            // Store the token and user data in localStorage
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));

            alert('Login successful!'); //Change alert!
            this.router.navigate(['/home']);
          },
          error: (error) => {
            console.error('Login failed:', error);
            alert(error.error.message || 'Login failed. Please try again.');
          },
        });
    }
  }
}
