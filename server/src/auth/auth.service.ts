import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from '../users/users.repository';
import { SignUpDto } from '../users/dto/sign.up.dto';
import { SignInDto } from '../users/dto/sign.in.dto';
import * as bcrypt from 'bcryptjs';
import { Users } from '../users/users.entity';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
  ) {}
  async signUp(signUpUserInfo: SignUpDto) {
    const { password } = signUpUserInfo;
    const salt = await bcrypt.genSalt();
    signUpUserInfo.password = await bcrypt.hash(password, salt);
    return this.usersRepository.signUp(signUpUserInfo);
  }

  async signIn(signInUserInfo: SignInDto) {
    const { email, password } = signInUserInfo;
    const user: Users = await this.usersRepository.signIn(email);

    if (user && (await bcrypt.compare(password, user.password)))
      return 'login-success';
    else throw new UnauthorizedException('logIn failed');
  }
}
