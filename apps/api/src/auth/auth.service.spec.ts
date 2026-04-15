import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';

const mockUser = {
  id: 'uuid-id',
  name: 'ariel',
  email: 'user@test.com',
  password: '123456',
  role: 'EMPLOYEE' as Role,
};

const mockPrismaService = {
  user: {
    findUnique: jest.fn(),
  },
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should return NotFoundException if the email is already in use', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);

      await expect(service.register(mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
