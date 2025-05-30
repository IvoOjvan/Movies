import { Component } from '@angular/core';
import { MovieSliderComponent } from '../movie-slider/movie-slider.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';

@Component({
  selector: 'app-home',
  imports: [MovieSliderComponent, SearchBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
