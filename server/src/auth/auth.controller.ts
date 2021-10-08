import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from '../users/dto/sign.up.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() signUpUserInfo: SignUpDto) {
    return this.authService.signUp(signUpUserInfo);
  }
}
