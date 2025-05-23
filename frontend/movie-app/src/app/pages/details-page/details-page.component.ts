import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShowApiDataService } from '../../services/show-api-data.service';
import { MovieDetails } from '../../dtos/movie.dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details-page',
  imports: [CommonModule],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.scss',
})
export class DetailsPageComponent implements OnInit {
  public movie!: MovieDetails;

  constructor(
    private route: ActivatedRoute,
    private showApiDataService: ShowApiDataService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.showApiDataService.getMovieDetailsById(id).subscribe((data) => {
        this.movie = data;
      });
    });
  }

  public get hasLogos(): boolean {
    return !!this.movie?.images?.logos && this.movie.images.logos.length > 0;
  }
}
