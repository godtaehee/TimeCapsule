import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import * as faker from 'faker';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('Sign-up in UserController', () => {
    it('should return JSON which have success status and userId field if Sign-up is Success', async () => {
      const userInfo = {};
      const successSignUp = {
        success: true,
        userId: faker.random.alphaNumeric(),
      };
      usersService.signUp = jest.fn().mockResolvedValue(successSignUp);
      const result = await usersController.signUp(userInfo as any);
      expect(result).toBe(successSignUp);
    });
  });
});
