import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { provideIcons } from '@ng-icons/core';
import { bootstrapSearch } from '@ng-icons/bootstrap-icons';
import { NgIcon } from '@ng-icons/core';

import { MovieDTO, TMDBResponse } from '../../dtos/movie.dto';
import { ShowApiDataService } from '../../services/show-api-data.service';

@Component({
  selector: 'app-search-bar',
  imports: [NgIcon, ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
  providers: [provideIcons({ bootstrapSearch })],
})
export class SearchBarComponent implements OnInit {
  public searchControl = new FormControl();
  public results: MovieDTO[] = [];

  constructor(public apiService: ShowApiDataService) {}

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((term) => {
          if (!term || term.trim().length === 0) {
            this.results = [];
            return of(null);
          }
          return this.apiService.searchMovies(term);
        })
      )
      .subscribe((res: TMDBResponse | null) => {
        if (res && res.results) {
          this.results = res.results;
        }
      });
  }
}
