import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  input,
  OnInit,
} from '@angular/core';
import { ShowApiDataService } from '../../services/show-api-data.service';
import { MovieDTO } from '../../dtos/movie.dto';
import { RouterModule } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-movie-slider',
  imports: [RouterModule],
  templateUrl: './movie-slider.component.html',
  styleUrl: './movie-slider.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MovieSliderComponent implements OnInit {
  readonly section = input<string>();
  public movies: MovieDTO[] = [];

  constructor(private showApiDataService: ShowApiDataService) {}

  ngOnInit(): void {
    this.getMovies();
  }

  public async getMovies(): Promise<void> {
    const section = this.section();
    if (!section) {
      console.error('Section input is undefined.');
      return;
    }

    try {
      const response = await firstValueFrom(
        this.showApiDataService.fetchMoviesFromApi(section)
      );
      this.movies = response.results as MovieDTO[];
    } catch (error) {
      console.error(
        `Error fetching movies for section ${this.section()}`,
        error
      );
    }
  }
}
