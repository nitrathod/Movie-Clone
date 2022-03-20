import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  genreID: number | null = null;
  searchValue: string | null = null;

  constructor(private movieService: MoviesService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe(({ genreId }) => {
      if (genreId) {
        this.genreID = genreId;
        this.getMoviesByGenre(genreId, 1);
      } else {
        this.getPagedMovies(1);
      }
    });
  }

  getPagedMovies(page: number, searchKeyword?: string) {
    this.movieService.searchMovies(page, searchKeyword).subscribe((movies) => {
      this.movies = movies;
    });
  }

  getMoviesByGenre(genreId: number, pageNumber: number) {
    this.movieService.getMoviesByGenre(genreId, pageNumber).subscribe((movies) => {
      this.movies = movies;
    });
  }

  paginate(event: any) {
    const pageNumber = event.page + 1;
    if (this.genreID) {
      this.getMoviesByGenre(this.genreID, pageNumber);
    } else if (this.searchValue) {
      this.getPagedMovies(pageNumber, this.searchValue);
    } else {
      this.getPagedMovies(pageNumber);
    }
  }

  searchChanged() {
    if (this.searchValue) {
      this.getPagedMovies(1, this.searchValue);
    }
  }
}
