import {
  Body,
  Controller,
  Get,
  Post,
  Put,
} from '@nestjs/common';
import { User } from 'user/schemas/users.schema';

import { MoviesService } from './movies.service';
import { Movie } from './schemas/movies.schema';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async getAllMovies(): Promise<Movie[]> {
    return await this.moviesService.getAllMovies();
  }

  @Post('/create')
  async createMovie(@Body() movie: Movie): Promise<Movie[]> {
    await this.moviesService.createMovie(movie);
    const movies = await this.moviesService.getAllMovies();
    return movies;
  }

  @Put('/like')
  async likeMovie(
    @Body('email') email: User['email'],
    @Body('movieId') movieId: Movie['movieId'],
  ): Promise<Movie[]> {
    return await this.moviesService.likeMovie(email, movieId);
  }

  @Put('/dislike')
  async dislikeMovie(
    @Body('email') email: User['email'],
    @Body('movieId') movieId: Movie['movieId'],
  ): Promise<Movie[]> {
    return await this.moviesService.dislikeMovie(email, movieId);
  }
}
