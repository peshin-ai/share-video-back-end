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
    const newMovie = await this.movieModel.create(movie);
    return newMovie;
  }

  async deleteMovie(id: string, movie: Movie): Promise<Movie> {
    const deletedMovie = await this.movieModel.findByIdAndRemove(id, movie);
    return deletedMovie;
  }

  async likeMovie(email: string, movieId: string): Promise<Movie> {
    const userVail = await this.userService.getUser({ email });
    console.log(userVail);
    if (!userVail) {
      throw new UnauthorizedException('please login');
    }

    this.userService.likesMovie({ email }, movieId);

    const movie = await this.movieModel.findById(movieId).exec();
    const isUserLike = movie.likedBy.findIndex((user) => user === email);

    if (isUserLike !== -1) {
      movie.likedBy.splice(isUserLike, 1);
      movie.likes += 1;
      movie.save();
    } else {
      movie.likes += 1;
      movie.save();
    }

    return movie;
  }

  async dislikeMovie(email: string, movieId: string): Promise<Movie> {
    const user = await this.userService.getUser({ email });

    if (!user) {
      throw new UnauthorizedException('please login');
    }

    this.userService.likesMovie({ email }, movieId);

    const movie = await this.movieModel.findById(movieId).exec();
    const isUserLike = movie.dislikedBy.findIndex((user) => user === email);

    if (isUserLike !== -1) {
      movie.dislikedBy.splice(isUserLike, 1);
      movie.dislikes -= 1;
      movie.save();
    } else {
      movie.dislikes += 1;
      movie.save();
    }
    return movie;
  }
}
