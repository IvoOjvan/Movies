import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';

import { UserLogin } from '../dtos/user.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private token!: string;
  private tokenTimer!: ReturnType<typeof setTimeout>;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  public getToken() {
    return this.token;
  }

  public login(email: string, password: string) {
    const authData: UserLogin = { email: email, password: password };
    this.http
      .post<{ token: string; expiresIn: number }>(
        'http://localhost:4200/user/login',
        authData
      )
      .subscribe((Response) => {
        const token = Response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = Response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);

          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 1000
          );
          console.log(expirationDate);
          this.saveAuthData(token, expirationDate);
          // this.router.navigate(['/home']);  STAVLJENO PREUSMJERAVANJE U LOGIN COMPONENTU DIREKTNO
        }
      });
  }

  public autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    console.log(authInformation, expiresIn);
    if (expiresIn > 0) {
      this.token = authInformation?.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000); //works with ms so wwe are dividing it with 1000
      this.authStatusListener.next(true);
    }
  }

  public logout() {
    this.token = '';
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    //this.router.navigate(['/']);
    this.router.navigate(['/home']);
  }

  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }
  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('user');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
    };
  }
}
//TODO:
// u header komponenti za mijenjanje buttona na login/logout ovisno je li user logiran
// treba se dodati this.userIsAuthenticated = this.authService.getIsAuth(); i to
// postaviti 1. u ngOnInit()
