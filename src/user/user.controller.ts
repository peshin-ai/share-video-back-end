import { Body, Controller, Post } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { User } from './schemas/users.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post('/signup')
  async createUser(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<User> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const result = await this.usersService.createUser(email, hashedPassword);
    return result;
  }
}
