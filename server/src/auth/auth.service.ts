import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from '../users/users.repository';
import { SignUpDto } from '../users/dto/sign.up.dto';
import { SignInDto } from '../users/dto/sign.in.dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
  ) {}
  async signUp(signUpUserInfo: SignUpDto) {
    return this.usersRepository.signUp(signUpUserInfo);
  }

  signIn(signInUserInfo: SignInDto) {
    return this.usersRepository.signIn(signInUserInfo);
  }
}
