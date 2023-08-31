import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';

import { User, UserDocument } from './schemas/users.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<UserDocument>,
  ) {}

  async createUser(email: string, password: string): Promise<User> {
    return this.userModel.create({
      email,
      password,
    });
  }

  async getUser(user: object): Promise<User> {
    return this.userModel.findOne(user);
  }

  async likesMovie(user: object, movieId: string): Promise<User> {
    const userVail = await this.userModel.findOne(user).exec();
    const isUserLike = userVail.likes.findIndex((movie) => movie === movieId);

    if (isUserLike !== -1) {
      userVail.likes.splice(isUserLike, 1);
    }
    userVail.likes.push(movieId);
    userVail.save();
    return userVail;
  }

  async dislikesMovie(user: object, movieId: string): Promise<User> {
    const userVail = await this.userModel.findOne(user).exec();
    userVail.likes.push(movieId);
    userVail.save();
    return userVail;
  }
}
