import {
  Body,
  Controller,
  Post,
  Request,
} from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('auth/login')
  async login(
    @Request()
    @Body('password')
    password: string,
    @Body('email') email: string,
  ): Promise<object> {
    return this.authService.login({ userEmail: email, password });
  }
}
