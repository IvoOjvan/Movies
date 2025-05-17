import { Component } from '@angular/core';
import { ShowApiDataService } from '../../services/show-api-data.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  //public movies: any[] = any;

  constructor(private showDataService: ShowApiDataService) {}

  public onGetData(): void {
    this.showDataService.fetchMoviesFromApi().subscribe({
      next: (data) => console.log('TMDB Data:', data),
      error: (err) => console.log('Error fetching TMDB movies:', err),
    });
  }
}
