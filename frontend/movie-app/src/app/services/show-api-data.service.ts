import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class ShowApiDataService {
  private tmdbApiUrl = 'https://api.themoviedb.org/3';

  private httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${environment.apiReadAccessToken}`,
      Accept: 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  public fetchMoviesFromApi() {
    //popular movies
    const apiUrl = `${this.tmdbApiUrl}/movie/popular?language=en&page=1`;
    return this.http.get(apiUrl, this.httpOptions);
  }
}
