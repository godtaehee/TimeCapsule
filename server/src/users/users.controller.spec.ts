import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import * as faker from 'faker';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from './users.entity';
class MockUsersRepository {
  #successSignUpDate = {
    success: true,
    userId: 1,
  };
  save(userData: any) {
    return this.#successSignUpDate;
  }
}
describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useClass: MockUsersRepository,
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });
});
