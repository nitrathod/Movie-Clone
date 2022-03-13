import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  constructor(private movieService: MoviesService) {}

  ngOnInit(): void {
    this.movieService.searchMovies(100).subscribe((movies) => {
      this.movies = movies;
    });
  }
}
