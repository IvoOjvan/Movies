import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  //izbrisi ngONInit
  title = 'movie-app';

  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.autoAuthUser();

    //Test stuff
    this.apiService.pingBackend().subscribe({
      next: (msg) => console.log(msg),
      error: (err) => console.error('Ping failed:', err),
    });
  }
}
