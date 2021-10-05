import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import * as faker from 'faker';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from './users.entity';
class MockUsersRepository {
  #userData = [{ id: 1, email: 'godtaeheedev@gmail.com', password: 123 }];
  save(requestUserData: any) {
    const data = this.#userData.find((v) => v.email === requestUserData.email);
    if (data) return { success: false };
    return {
      success: true,
      userId: 2,
    };
  }
}

describe('UsersService', () => {
  let usersService: UsersService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useClass: MockUsersRepository,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('Sign-up in UserService', () => {
    it('should return JSON which have success status and userId field if Sign-up is Success', () => {
      const userData = {
        email: 'wonderfulhuman@naver.com',
        password: 'srch0382',
      };
      expect(usersService.signUp(userData as any)).resolves.toStrictEqual({
        success: true,
        userId: 2,
      });
    });
  });
});
