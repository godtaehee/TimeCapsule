import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersRepository } from '../users/users.repository';
import * as faker from 'faker';
import { JwtModule, JwtService } from '@nestjs/jwt';
const mockRepository = {
  save: jest.fn(),
  findOne: jest.fn(),
};
const mockJwtService = {};

describe('AuthService', () => {
  let service: AuthService;
  let repository: UsersRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersRepository,
          useValue: mockRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    repository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Sign-Up', () => {
    const bcrypt = {
      genSalt: jest
        .fn()
        .mockResolvedValueOnce(
          faker.datatype.hexaDecimal(faker.datatype.number()),
        ),
      hash: jest
        .fn()
        .mockResolvedValueOnce(
          faker.datatype.hexaDecimal(faker.datatype.number()),
        ),
    };
    it('should generate hashed Password', async () => {
      const password = faker.internet.password();
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      expect(hashedPassword).toBeTruthy();
    });
  });

  describe('Sign-In', () => {
    const bcrypt = {
      compare: jest.fn().mockResolvedValueOnce(true),
    };
    it('should be true if user exist and correct with Dto password and hashed password', () => {
      const passwordInSignInDto = { password: faker.internet.password() };
      const foundUserInfo = {
        username: faker.internet.userName(),
        password: faker.internet.password(),
      };

      expect(
        foundUserInfo &&
          bcrypt.compare(passwordInSignInDto.password, foundUserInfo.password),
      ).toBeTruthy();
    });
  });
});
