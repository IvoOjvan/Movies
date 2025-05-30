import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieDTO } from '../dtos/movie.dto';

@Injectable({
  providedIn: 'root',
})
export class FavouritesService {
  private apiUrl = 'http://localhost:5200/movies';

  constructor(private http: HttpClient) {}

  public getFavourites(): Observable<MovieDTO[]> {
    return this.http.get<MovieDTO[]>(`${this.apiUrl}/favourites`);
  }

  public addFavourite(movie: MovieDTO): Observable<unknown> {
    return this.http.post(`${this.apiUrl}/${movie.id}/favourite`, { movie });
  }

  public removeFavourite(movieId: number): Observable<unknown> {
    return this.http.delete(`${this.apiUrl}/${movieId}/favourite`);
  }
}
