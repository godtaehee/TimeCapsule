import { EntityRepository, Repository } from 'typeorm';
import { Users } from './users.entity';
import { SignUpDto } from './dto/sign.up.dto';
import * as bcrypt from 'bcryptjs';
import { SignInDto } from './dto/sign.in.dto';

@EntityRepository(Users)
export class UsersRepository extends Repository<Users> {
  async signUp(signUpUserInfo: SignUpDto) {
    const user = this.create(signUpUserInfo);
    try {
      await this.save(user);
    } catch (err) {
      throw err;
    }
  }

  signIn(signInUserInfo: SignInDto) {}
}
