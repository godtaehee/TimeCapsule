import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from '../users/users.repository';
import { SignUpDto } from '../users/dto/sign.up.dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
  ) {}
  async signUp(signUpUserInfo: SignUpDto) {
    return this.usersRepository.SignUp(signUpUserInfo);
  }
}
