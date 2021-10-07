import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from '../users/users.entity';
import { SignUpDto } from '../users/dto/sign.up.dto';

class MockUsersRepository {}

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(Users),
          useClass: MockUsersRepository,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('Sign-Up', () => {
    it('should be return userInfo', async () => {
      const signUpUserInfo: SignUpDto = {} as any;
      const signUpResultInfo = {};

      authService.signUp = jest.fn().mockResolvedValueOnce(signUpResultInfo);
      const result = await authController.signUp(signUpUserInfo);
      expect(result).toBe(signUpResultInfo);
    });
  });
});
