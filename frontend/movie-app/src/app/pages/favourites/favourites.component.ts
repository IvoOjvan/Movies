import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShowApiDataService } from '../../services/show-api-data.service';
import { MovieDTO } from '../../dtos/movie.dto';
import { FavouritesService } from '../../services/favourites.service';

@Component({
  selector: 'app-favourites',
  imports: [RouterModule],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.scss',
})
export class FavouritesComponent implements OnInit {
  public favourites: MovieDTO[] = [];

  constructor(
    private favouritesService: FavouritesService,
    public showApiData: ShowApiDataService
  ) {}

  ngOnInit(): void {
    this.favouritesService
      .getFavourites()
      .subscribe((favs) => (this.favourites = favs));
  }

  public removeFromFavourites(movieId: number) {
    this.favouritesService.removeFavourite(movieId).subscribe(() => {
      this.favourites = this.favourites.filter((f) => f.id !== movieId);
    });
  }

  public getImageUrl(path: string): string {
    return path
      ? `https://image.tmdb.org/t/p/w500${path}`
      : 'assets/images/logo.png';
  }
}
