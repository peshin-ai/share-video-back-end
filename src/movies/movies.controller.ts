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
  async createMovie(@Body() movie: Movie): Promise<Movie> {
    return await this.moviesService.createMovie(movie);
  }

  @Put('/like')
  async likeMovie(
    @Body('email') email: User['email'],
    @Body('id') movieId: Movie['id'],
  ): Promise<Movie> {
    return await this.moviesService.likeMovie(email, movieId);
  }

  @Put('/dislike')
  async dislikeMovie(
    @Body('email') email: User['email'],
    @Body('id') movieId: Movie['id'],
  ): Promise<Movie> {
    return await this.moviesService.dislikeMovie(email, movieId);
  }
}
