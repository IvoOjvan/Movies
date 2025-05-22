import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Observable } from 'rxjs';
import { TMDBResponse } from '../dtos/movie.dto';

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

  public fetchMoviesFromApi(section: string): Observable<TMDBResponse> {
    const validSections = ['now_playing', 'popular', 'top_rated', 'upcoming'];
    const selectedSection = validSections.includes(section)
      ? section
      : 'popular';
    const apiUrl = `${this.tmdbApiUrl}/movie/${selectedSection}?language=en&page=1`;
    return this.http.get<TMDBResponse>(apiUrl, this.httpOptions);
  }
}
