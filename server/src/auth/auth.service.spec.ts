import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersRepository } from '../users/users.repository';
import * as faker from 'faker';
const mockRepository = {
  save: jest.fn(),
  findOne: jest.fn(),
};
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
});
