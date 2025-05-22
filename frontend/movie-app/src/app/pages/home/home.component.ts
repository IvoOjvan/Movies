import { Component } from '@angular/core';
import { MovieSliderComponent } from '../movie-slider/movie-slider.component';

@Component({
  selector: 'app-home',
  imports: [MovieSliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
