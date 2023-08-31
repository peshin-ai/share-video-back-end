import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'user/user.module';
import { UserService } from 'user/user.service';

import { UserSchema } from '../user/schemas/users.schema';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { MovieSchema } from './schemas/movies.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Movie', schema: MovieSchema }]),
    UserModule,
  ],
  controllers: [MoviesController],
  providers: [MoviesService, UserService],
})
export class MoviesModule {}
