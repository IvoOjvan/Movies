import { Component, OnInit } from '@angular/core';
import { MovieDTO } from '../../dtos/movie.dto';
import { FavouritesService } from '../../services/favourites.service';
import { Router, RouterModule } from '@angular/router';

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
    private router: Router
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

  public goToDetails(movieId: number) {
    this.router.navigate(['/movie', movieId]);
  }
}
