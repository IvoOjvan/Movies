import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { AuthService } from '../auth.service';
import { ToastService } from '../../services/toast.service';
import { Router } from '@angular/router';

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

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };

      this.authService
        .login(loginData.email || '', loginData.password || '')
        .subscribe({
          next: (response) => {
            this.authService.handleLogin(response.token, response.expiresIn);

            this.toastService.showToast(
              'Signin successful',
              'You have successfully signed in!',
              'success'
            );
            this.router.navigate(['/home']);
          },
          error: () => {
            this.toastService.showToast(
              'Signin failed',
              'Invalid email or password',
              'error'
            );
          },
        });
    }
  }
}
