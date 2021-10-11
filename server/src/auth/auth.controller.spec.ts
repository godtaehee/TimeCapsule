import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignUpDto } from '../users/dto/sign.up.dto';
import { UsersRepository } from '../users/users.repository';
import * as faker from 'faker';
import { Sign } from 'crypto';
import { SignInDto } from '../users/dto/sign.in.dto';

const mockRepository = {
  save: jest.fn(),
  findOne: jest.fn(),
};
describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: UsersRepository,
          useValue: mockRepository,
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

    it('should be called with SignUpDto', async () => {
      const signUpDto: SignUpDto = {
        email: faker.internet.email(),
        nickname: faker.internet.userName(),
        password: faker.random.alpha(),
      };

      authService.signUp = jest.fn();
      const authControllerSpy = jest.spyOn(authController, 'signUp');
      await authController.signUp(signUpDto as any);
      expect(authControllerSpy).toBeCalledWith(signUpDto);
    });
  });

  describe('Sign-in in UserController', () => {
    it('should return JSON which have success status and userId field if Sign-in is Success', async () => {
      const signInInfo = {};
      const successSignUp = {
        success: true,
        userId: faker.datatype.number(1),
      };
      authService.signIn = jest.fn().mockResolvedValueOnce(successSignUp);
      const result = await authController.signIn(signInInfo as any);
      expect(result).toBe(successSignUp);
    });

    it('should be called with SignInDto', async () => {
      const signInDto: SignInDto = {
        email: faker.internet.email(),
        password: faker.random.alpha(),
      };

      authService.signIn = jest.fn();
      const authControllerSpy = jest.spyOn(authController, 'signIn');
      await authController.signIn(signInDto as any);
      expect(authControllerSpy).toBeCalledWith(signInDto);
    });
  });
});
