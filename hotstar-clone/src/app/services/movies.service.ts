import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie, MovieCredits, MovieDto, MovieImages, MovieVideoDto } from '../models/movie';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { GenreDto } from '../models/genre';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  baseUrl = 'https://api.themoviedb.org/3';
  apiKey = 'c0f9f2d9cb978825b4fea0898bc2d598';
  constructor(private http: HttpClient) {}

  getMovies(type: string = 'upcoming', count: number = 12) {
    return this.http.get<MovieDto>(`${this.baseUrl}/movie/${type}?api_key=${this.apiKey}`).pipe(
      switchMap((res) => {
        return of(res.results.slice(0, count));
      })
    );
  }

  getMovieDetails(id: string) {
    return this.http.get<Movie>(`${this.baseUrl}/movie/${id}?api_key=${this.apiKey}`);
  }

  getMovieVideos(id: string) {
    return this.http
      .get<MovieVideoDto>(`${this.baseUrl}/movie/${id}/videos?api_key=${this.apiKey}`)
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }

  getMovieImages(id: string) {
    return this.http.get<MovieImages>(`${this.baseUrl}/movie/${id}/images?api_key=${this.apiKey}`);
  }

  getMovieCredits(id: string) {
    return this.http.get<MovieCredits>(
      `${this.baseUrl}/movie/${id}/credits?api_key=${this.apiKey}`
    );
  }

  getMovieSimilar(id: string) {
    return this.http
      .get<MovieDto>(`${this.baseUrl}/movie/${id}/similar?api_key=${this.apiKey}`)
      .pipe(
        switchMap((res) => {
          return of(res.results.slice(0, 12));
        })
      );
  }

  getMoviesGenres() {
    return this.http.get<GenreDto>(`${this.baseUrl}/genre/movie/list?api_key=${this.apiKey}`).pipe(
      switchMap((res) => {
        return of(res.genres);
      })
    );
  }

  getMoviesByGenre(genreId: number, pageNumber: number) {
    return this.http
      .get<MovieDto>(
        `${this.baseUrl}/discover/movie?with_genres=${genreId}&page=${pageNumber}&api_key=${this.apiKey}`
      )
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }

  searchMovies(page: number, searchValue?: string) {
    const uri = searchValue ? '/search/movie' : '/movie/popular';
    return this.http
      .get<MovieDto>(
        `${this.baseUrl}${uri}?page=${page}&query=${searchValue}&api_key=${this.apiKey}`
      )
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }
}
