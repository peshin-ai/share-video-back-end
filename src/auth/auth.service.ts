import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'user/user.service';

export type User = {
  _id?: string;
  userEmail: string;
  password: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<User['userEmail'] | undefined> {
    const userVail = await this.usersService.getUser({ email });
    if (!userVail) {
      return undefined;
    }

    const passwordValid = await bcrypt.compare(password, userVail.password);
    if (!passwordValid) {
      throw new BadRequestException('password is not correct');
    }

    if (userVail && passwordValid) {
      return userVail.email;
    }

    return undefined;
  }

  async login(user: User) {
    let data = await this.validateUser(user.userEmail, user.password);

    if (!data) {
      data = (await this.usersService.createUser(user.userEmail, user.password))
        .email;
    }

    const payload = { userEmail: data, sub: user._id };
    return {
      email: user.userEmail,
      access_token: this.jwtService.sign(payload),
    };
  }
}
