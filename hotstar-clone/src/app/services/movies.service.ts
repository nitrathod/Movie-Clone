import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  movieURL = 'https://api.themoviedb.org/3/movie/upcoming?api_key=c0f9f2d9cb978825b4fea0898bc2d598';

  constructor(private http: HttpClient) {}

  getMovies() {
    return this.http.get<any>(this.movieURL);
  }
}
