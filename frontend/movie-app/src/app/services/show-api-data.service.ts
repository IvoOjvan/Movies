import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { MovieDetails, TMDBResponse } from '../dtos/movie.dto';
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

  constructor(private http: HttpClient, private router: Router) {}

  public fetchMoviesFromApi(section: string): Observable<TMDBResponse> {
    const apiKey = environment.apiKey;
    const validSections = ['now_playing', 'popular', 'top_rated', 'upcoming'];
    const selectedSection = validSections.includes(section)
      ? section
      : 'popular';
    const apiUrl = `${this.tmdbApiUrl}/movie/${selectedSection}?api_key=${apiKey}&language=en&page=1`;
    return this.http.get<TMDBResponse>(apiUrl);
  }

  public getMovieDetailsById(id: number): Observable<MovieDetails> {
    const apiKey = environment.apiKey;
    const url = `${this.tmdbApiUrl}/movie/${id}?api_key=${apiKey}&append_to_response=credits,images,videos,keywords`;
    return this.http.get<MovieDetails>(url);
  }

  public goToDetails(movieId: number) {
    this.router.navigate(['/movie', movieId]);
  }

  public searchMovies(query: string, page = 1): Observable<TMDBResponse> {
    if (!query || query.trim().length === 0) {
      return of({
        page: 1,
        results: [],
        total_pages: 0,
        total_results: 0,
      });
    }

    const params = new HttpParams()
      .set('api_key', environment.apiKey)
      .set('language', 'hr-HR')
      .set('query', query)
      .set('page', page.toString())
      .set('include_adult', 'false');

    return this.http.get<TMDBResponse>(`${this.tmdbApiUrl}/search/movie`, {
      params,
    });
  }
}
