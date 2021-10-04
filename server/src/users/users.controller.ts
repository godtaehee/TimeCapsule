import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  signUp(signUpUserInfo: any) {
    return this.userService.signUp(signUpUserInfo);
  }
}
