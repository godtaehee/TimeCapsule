import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { UsersRepository } from './users.repository';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}
  async signUp(signUpUserInfo: any) {
    return this.usersRepository.save(signUpUserInfo);
  }
}
