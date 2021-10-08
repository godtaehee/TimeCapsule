import { EntityRepository, Repository } from 'typeorm';
import { Users } from './users.entity';
import { SignUpDto } from './dto/sign.up.dto';
import * as bcrypt from 'bcryptjs';

@EntityRepository(Users)
export class UsersRepository extends Repository<Users> {
  async SignUp(signUpUserInfo: SignUpDto) {
    const { email, nickname, password } = signUpUserInfo;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.create({
      email,
      nickname,
      password: hashedPassword,
    });
    try {
      await this.save(user);
    } catch (err) {
      console.error(err);
    }
  }
}
