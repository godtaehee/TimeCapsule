import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import * as faker from 'faker';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

describe('Sign-up in UserController', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should return JSON which have success status and userId field if Sign-up is Success', () => {
    const userInfo = {};
    const successSignUp = {
      success: true,
      userId: faker.random.alphaNumeric(),
    };
    usersService.signUp = jest.fn().mockResolvedValue(successSignUp);
    const result = usersController.signUp(userInfo as any);
    expect(result).toBe(successSignUp);
  });
});
