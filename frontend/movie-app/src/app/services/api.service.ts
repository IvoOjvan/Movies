import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

const BASE_URL = 'http://localhost:5200';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public pingBackend() {
    return this.http.get(`${BASE_URL}/movies/ping`, { responseType: 'text' });
  }

  async userSignUp(userData: any) {
    return await firstValueFrom(
      this.http.post(`${BASE_URL}/user/sign-up`, userData)
    );
  }

  async userSignIn(userData: any) {
    return await firstValueFrom(
      this.http.post(`${BASE_URL}/user/sign-in`, userData)
    );
  }

  // async getFavouriteMovies(userId: string) {
  //   return await firstValueFrom(
  //     this.http.get(`${BASE_URL}/movies/favourites`, {
  //       headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  //       //body: JSON.stringify(userId),
  //     })
  //   );
  // }

  async getFavouriteMovies(userId: string) {
    return await firstValueFrom(
      this.http.get(`${BASE_URL}/movies/favourites`, {
        params: { userId },
      })
    );
  }

  async addMovieToFavourites(movie: any, userId: string) {
    return await firstValueFrom(
      this.http.post(`${BASE_URL}/movies/${movie.id}/favourite`, {
        movie,
        userId,
      })
    );
  }

  async removeMovieFromFavourites(movieId: string, userId: string) {
    return await firstValueFrom(
      this.http.request('delete', `${BASE_URL}/movies/${movieId}/favourite`, {
        body: { movieId, userId },
      })
    );
  }
}
