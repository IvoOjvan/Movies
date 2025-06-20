import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';

import { UserLogin } from '../dtos/user.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private token!: string;
  private tokenTimer!: ReturnType<typeof setTimeout>;
  private authStatusListener = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  public getToken() {
    return this.token;
  }

  public getIsAuth() {
    return this.isAuthenticated;
  }

  public getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  public login(
    email: string,
    password: string
  ): Observable<{ token: string; expiresIn: number }> {
    const authData: UserLogin = { email: email, password: password };
    return this.http.post<{ token: string; expiresIn: number }>(
      'http://localhost:5200/user/login',
      authData
    );
  }

  public handleLogin(token: string, expiresIn: number) {
    this.token = token;
    this.isAuthenticated = true;
    this.authStatusListener.next(true);

    const now = new Date();
    const expirationDate = new Date(now.getTime() + expiresIn * 1000);
    this.saveAuthData(token, expirationDate);
    this.setAuthTimer(expiresIn);
  }

  public autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      console.log('No auth info, emitting false');
      this.authStatusListener.next(false);
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();

    if (expiresIn > 0) {
      this.token = authInformation?.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000); //works with ms so wwe are dividing it with 1000
      console.log('Valid token, emitting true');
      this.authStatusListener.next(true);
    } else {
      console.log('Token expired, emitting false');
      this.authStatusListener.next(false);
    }
  }

  public logout() {
    this.token = '';
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
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
