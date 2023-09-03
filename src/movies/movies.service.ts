import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { UserService } from 'user/user.service';

import { Movie } from './schemas/movies.schema';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie.name)
    private movieModel: mongoose.Model<Movie>,
    private readonly userService: UserService,
  ) {}

  async getAllMovies(): Promise<Movie[]> {
    return await this.movieModel.find().exec();
  }

  async getMovieById(id: string): Promise<Movie> {
    return await this.movieModel.findById(id).exec();
  }

  async createMovie(movie: Movie): Promise<Movie> {
    const movieLikes = 0;
    const movieLikesBy = [];
    const movieDislikes = 0;
    const movieDislikesBy = [];
    const movieData = {
      ...movie,
      movieLikes,
      movieLikesBy,
      movieDislikes,
      movieDislikesBy,
    };

    const newMovie = await this.movieModel.create(movieData);
    return newMovie;
  }

  async deleteMovie(id: string, movie: Movie): Promise<Movie> {
    const deletedMovie = await this.movieModel.findByIdAndRemove(id, movie);
    return deletedMovie;
  }

  async likeMovie(email: string, movieId: string): Promise<Movie[]> {
    const userVail = await this.userService.getUser({ email });

    if (!userVail) {
      throw new UnauthorizedException('please login');
    }

    this.userService.likesMovie({ email }, movieId);

    const movie = await this.movieModel.findById(movieId).exec();

    const userLike = movie.movieLikesBy.findIndex((user) => user === email);

    if (userLike !== -1) {
      movie.movieLikesBy.splice(userLike, 1);
      movie.movieLikes -= 1;
      movie.save();
    } else {
      movie.movieLikesBy.push(email);
      movie.movieLikes += 1;
      movie.save();
    }

    const movies = await this.getAllMovies();

    return movies;
  }

  async dislikeMovie(email: string, movieId: string): Promise<Movie[]> {
    const user = await this.userService.getUser({ email });

    if (!user) {
      throw new UnauthorizedException('please login');
    }

    this.userService.likesMovie({ email }, movieId);

    const movie = await this.movieModel.findById(movieId).exec();
    const userDislike = movie.movieDislikesBy.findIndex(
      (user) => user === email,
    );

    if (userDislike !== -1) {
      movie.movieDislikesBy.splice(userDislike, 1);
      movie.movieDislikes -= 1;
      movie.save();
    } else {
      movie.movieDislikesBy.push(email);
      movie.movieDislikes += 1;
      movie.save();
    }

    const movies = await this.getAllMovies();

    return movies;
  }
}
