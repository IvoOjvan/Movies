import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FavouritesService } from '../../services/favourites.service';
import { ShowApiDataService } from '../../services/show-api-data.service';
import { MovieDetails, MovieDTO } from '../../dtos/movie.dto';

@Component({
  selector: 'app-details-page',
  imports: [CommonModule],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.scss',
})
export class DetailsPageComponent implements OnInit {
  public movie!: MovieDetails;

  constructor(
    private route: ActivatedRoute,
    private showApiDataService: ShowApiDataService,
    private favouritesService: FavouritesService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.showApiDataService.getMovieDetailsById(id).subscribe((data) => {
        this.movie = data;
      });
    });
  }

  public get hasLogos(): boolean {
    return !!this.movie?.images?.logos && this.movie.images.logos.length > 0;
  }

  public addToFavourites() {
    const movieDTO: MovieDTO = {
      id: this.movie.id,
      title: this.movie.title,
      release_date: this.movie.release_date,
      poster_path: this.movie.poster_path,
      backdrop_path: this.movie.backdrop_path,
      genre_ids: this.movie.genres.map((g) => g.id),
      original_language: this.movie.original_language,
      original_title: this.movie.original_title,
      overview: this.movie.overview,
      popularity: 0,
      adult: false,
      video: false,
      vote_average: this.movie.vote_average,
      vote_count: 0,
    };

    this.favouritesService.addFavourite(movieDTO).subscribe({
      next: () => alert('Movie added to favourites!'),
      error: (err) => alert('Error: ' + err.error.message),
    });
  }
}
