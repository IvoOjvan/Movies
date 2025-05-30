import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers: [],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public userIsAuthenticated = false;
  private authListenerSubs!: Subscription;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    console.log('Header init, userisAuthenticated:', this.userIsAuthenticated);
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        console.log(
          'Header subscription fired, isAuthenticated:',
          isAuthenticated
        );
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  public navigateHome(): void {
    this.router.navigate(['/home']);
  }

  public onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
  }
}
