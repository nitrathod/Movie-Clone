import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie, MovieCredits, MovieImages, MovieVideo } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';
import { IMAGES_SIZES } from '../../constants/images-sizes';
import { first } from 'rxjs/operators';

@Component({
  selector: 'movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  movie: Movie | null = null;
  movieVideos: MovieVideo[] = [];
  movieImages: MovieImages | null = null;
  movieCredits: MovieCredits | null = null;
  similarMovies: Movie[] = [];
  imagesSizes = IMAGES_SIZES;

  constructor(private route: ActivatedRoute, private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.route.params.pipe(first()).subscribe(({ id }) => {
      this.getMovieDetails(id);
      this.getMovieVidoes(id);
      this.getMovieImages(id);
      this.getMovieCredits(id);
      this.getSimilarMovies(id);
    });
  }

  ngOnDestroy() {
    console.log('component destroyed!');
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

  getSimilarMovies(id: string) {
    this.moviesService.getMovieSimilar(id).subscribe((similarMoviesData) => {
      this.similarMovies = similarMoviesData;
    });
  }

  getMovieCredits(id: string) {
    this.moviesService.getMovieCredits(id).subscribe((movieCreditsData) => {
      this.movieCredits = movieCreditsData;
    });
  }
}
