import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from '../users/dto/sign.up.dto';
import { SignInDto } from '../users/dto/sign.in.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body(ValidationPipe) signUpUserInfo: SignUpDto) {
    return this.authService.signUp(signUpUserInfo);
  }

  @Post('sign-in')
  async signIn(@Body(ValidationPipe) signInUserInfo: SignInDto) {
    return this.authService.signIn(signInUserInfo);
  }
}
