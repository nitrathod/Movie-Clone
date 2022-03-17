import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie, MovieImages, MovieVideo } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';
import { IMAGES_SIZES } from '../../constants/images-sizes';

@Component({
  selector: 'movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movie: Movie | null = null;
  movieVideos: MovieVideo[] = [];
  movieImages: MovieImages | null = null;
  imagesSizes = IMAGES_SIZES;

  constructor(private route: ActivatedRoute, private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      this.getMovieDetails(id);
      this.getMovieVidoes(id);
      this.getMovieImages(id);
    });
  }

  getMovieDetails(id: string) {
    this.moviesService.getMovieDetails(id).subscribe((movieData) => {
      this.movie = movieData;
      //console.log(this.movie);
    });
  }

  getMovieVidoes(id: string) {
    this.moviesService.getMovieVideos(id).subscribe((movieVidoes) => {
      this.movieVideos = movieVidoes;
    });
  }

  getMovieImages(id: string) {
    this.moviesService.getMovieImages(id).subscribe((movieImagesData) => {
      this.movieImages = movieImagesData;
    });
  }
}
