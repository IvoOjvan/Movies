import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

import { AuthService } from './auth/auth.service';
import { HeaderComponent } from './layout/header/header.component';
import { ToastComponent } from './components/toast/toast.component';
import { FooterComponent } from './layout/footer/footer.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, ToastComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'movie-app';
  public showFooter = true;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.autoAuthUser();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (
          event.urlAfterRedirects === '/user/login' ||
          event.urlAfterRedirects === '/user/signup'
        ) {
          this.showFooter = false;
        } else {
          this.showFooter = true;
        }
      });
  }
}
