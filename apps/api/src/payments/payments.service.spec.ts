import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsService } from './payments.service';
import { NotesService } from '../notes/notes.service';
import { PrismaService } from '../prisma/prisma.service';
import { mockNote, mockNoteWithPayments } from '../test-mocks/notes';
import { mockInvalidPayment, mockPayment } from '../test-mocks/payments';

const mockPrismaService = {
  payment: {
    create: jest.fn().mockResolvedValue(mockPayment),
    findByNote: jest.fn(),
    findUnique: jest.fn(),
    delete: jest.fn(),
  },
};

const mockNotesService = {
  findOne: jest.fn(),
};

describe('PaymentsService', () => {
  let service: PaymentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: NotesService,
          useValue: mockNotesService,
        },
      ],
    }).compile();

    service = module.get<PaymentsService>(PaymentsService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create the payment', async () => {
      mockNotesService.findOne.mockResolvedValue(mockNote);

      const payment = await service.create(mockPayment);

      expect(payment).toEqual(mockPayment);

      expect(mockPrismaService.payment.create).toHaveBeenCalledWith({
        data: {
          amount: mockPayment.amount,
          paymentMethod: mockPayment.paymentMethod,
          note: {
            connect: {
              id: mockPayment.noteId,
            },
          },
        },
      });

      expect(mockPrismaService.payment.create).toHaveBeenCalledTimes(1);
    });

    it('should return NotFoundException when the note does not exist', async () => {
      mockNotesService.findOne.mockRejectedValue(
        new NotFoundException('Note not found'),
      );

      await expect(service.create(mockInvalidPayment)).rejects.toThrow(
        NotFoundException,
      );

      expect(mockPrismaService.payment.create).not.toHaveBeenCalled();
    });
  });

  describe('findByNote', () => {
    it('should return the payments according to the note id', async () => {
      mockNotesService.findOne.mockResolvedValue(mockNoteWithPayments);

      const payments = await service.findByNote(mockNoteWithPayments.id);
      expect(payments).toHaveLength(1);
      expect(payments).toEqual([mockPayment]);
      expect(mockNotesService.findOne).toHaveBeenCalledWith(
        mockNoteWithPayments.id,
      );
    });

    it('should return NotFoundException when the note does not exist', async () => {
      mockNotesService.findOne.mockRejectedValue(
        new NotFoundException('Note not found'),
      );

      await expect(service.create(mockInvalidPayment)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockPrismaService.payment.create).not.toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('should delete the payment according to the id', async () => {
      mockPrismaService.payment.findUnique.mockResolvedValue(mockPayment);
      mockPrismaService.payment.delete.mockResolvedValue(mockPayment);

      const payment = await service.remove(mockPayment.id);
      expect(mockPrismaService.payment.delete).toHaveBeenCalledWith({
        where: { id: mockPayment.id },
      });
      expect(payment).toEqual(mockPayment);
    });

    it('should return NotFoundException when the payment does not exist', async () => {
      mockPrismaService.payment.findUnique.mockResolvedValue(null);

      await expect(service.remove(mockInvalidPayment.id)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockPrismaService.payment.delete).not.toHaveBeenCalled();
    });
  });
});
