import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from './customers.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

const mockCustomer = {
  id: 'customer-cuid',
  address: 'customer-address',
  facebookAlias: 'customer-fb-alias',
  name: 'customer-name',
  phone1: 'phone-1',
  phone2: 'phone-2',
  createdAt: new Date(),
};

const mockPrismaService = {
  customer: {
    create: jest.fn().mockResolvedValue(mockCustomer),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('CustomersService', () => {
  let service: CustomersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a customer and return it', async () => {
      const customer = await service.create(mockCustomer);

      expect(customer).toEqual(mockCustomer);
    });
  });

  describe('findAll', () => {
    it('should return a list of customers', async () => {
      mockPrismaService.customer.findMany.mockResolvedValue([mockCustomer]);

      const customers = await service.findAll();

      expect(customers).toHaveLength(1);
      expect(customers[0]).toEqual(mockCustomer);
    });
  });

  describe('findOne', () => {
    it('should return the customer with the given ID', async () => {
      mockPrismaService.customer.findUnique.mockResolvedValue(mockCustomer);

      const customer = await service.findOne('customer-cuid');

      expect(customer).toEqual(mockCustomer);
      expect(mockPrismaService.customer.findUnique).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            id: 'customer-cuid',
          },
        }),
      );
    });

    it('should throw NotFoundException when the customer does not exist', async () => {
      mockPrismaService.customer.findUnique.mockResolvedValue(null);

      expect(service.findOne('not-existing-cuid')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update the customer with the given ID', async () => {
      const updatedCustomer = {
        ...mockCustomer,
        name: 'new-name',
      };

      mockPrismaService.customer.findUnique.mockResolvedValue(mockCustomer);
      mockPrismaService.customer.update.mockResolvedValue(updatedCustomer);

      const newCustomer = await service.update(
        'customer-cuid',
        updatedCustomer,
      );

      expect(newCustomer).toEqual(updatedCustomer);
      expect(mockPrismaService.customer.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            id: 'customer-cuid',
          },
          data: {
            ...updatedCustomer,
          },
        }),
      );
    });

    it('should return NotFoundException when the customer does not exist', async () => {
      const updatedCustomer = {
        ...mockCustomer,
        name: 'new-name',
      };

      mockPrismaService.customer.findUnique.mockResolvedValue(null);

      expect(
        service.update('non-existing-cuid', updatedCustomer),
      ).rejects.toThrow(NotFoundException);
    });

    it('should not call the update method when the customer does not exist', async () => {
      mockPrismaService.customer.findUnique.mockResolvedValue(null);

      expect(mockPrismaService.customer.update).not.toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove the customer with the given ID', async () => {
      mockPrismaService.customer.findUnique.mockResolvedValue(mockCustomer);
      mockPrismaService.customer.delete.mockResolvedValue(mockCustomer);

      const deleteCustomer = await service.remove('customer-cuid');

      expect(deleteCustomer).toEqual(mockCustomer);
      expect(mockPrismaService.customer.delete).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            id: 'customer-cuid',
          },
        }),
      );
    });

    it('should return NotFoundException and not call delete method when the customer does not exist', async () => {
      mockPrismaService.customer.findUnique.mockResolvedValue(null);

      await expect(service.remove('non-existing-cuid')).rejects.toThrow(
        NotFoundException,
      );
      expect(mockPrismaService.customer.delete).not.toHaveBeenCalled();
    });
  });
});
