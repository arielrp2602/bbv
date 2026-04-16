import { Test, TestingModule } from '@nestjs/testing';
import { NotesService } from './notes.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { NoteType } from '@prisma/client';
import { CustomersService } from '../customers/customers.service';

const mockItem1 = {
  id: 'note-item-1-cuid',
  description: 'note-item-1-cuid',
  qty: 5,
  unitPrice: 15.5,
  total: 77.5,
  createdAt: Date.now(),
  noteId: 'note-cuid',
};

const mockItem2 = {
  id: 'note-item-2-cuid',
  description: 'note-item-2-cuid',
  qty: 6,
  unitPrice: 10,
  total: 60,
  createdAt: Date.now(),
  noteId: 'note-cuid',
};

const mockNoteItems = [mockItem1, mockItem2];

const dueDate = new Date();
dueDate.setDate(dueDate.getDate() + 45);

const mockNote = {
  id: 'note-cuid',
  items: mockNoteItems,
  payments: [],
  type: 'CONTADO' as NoteType,
  dueDate,
  subTotal: (mockItem1.total + mockItem2.total) * 0.9,
  total: mockItem1.total + mockItem2.total,
  customerId: 'customer-cuid',
  createdAt: new Date(),
};

const mockPrismaService = {
  note: {
    create: jest.fn().mockResolvedValue(mockNote),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

const mockCustomer = {
  id: 'customer-cuid',
  address: 'customer-address',
  facebookAlias: 'customer-fb-alias',
  name: 'customer-name',
  phone1: 'phone-1',
  phone2: 'phone-2',
  createdAt: new Date(),
};

const mockCustomersService = {
  findOne: jest.fn().mockResolvedValue(mockCustomer),
};

describe('NotesService', () => {
  let service: NotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotesService,
        {
          provide: CustomersService,
          useValue: mockCustomersService,
        },
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<NotesService>(NotesService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a note and return it', async () => {
      const note = await service.create(mockNote);

      expect(note).toEqual(mockNote);
    });
  });

  describe('findAll', () => {
    it('should return a list of notes', async () => {
      mockPrismaService.note.findMany.mockResolvedValue([mockNote]);

      const notes = await service.findAll();

      expect(notes).toHaveLength(1);
      expect(notes[0]).toEqual(mockNote);
    });
  });

  describe('findOne', () => {
    it('should return the note with the given ID', async () => {
      mockPrismaService.note.findUnique.mockResolvedValue(mockNote);

      const note = await service.findOne('note-cuid');

      expect(note).toEqual(mockNote);
      expect(mockPrismaService.note.findUnique).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            id: 'note-cuid',
          },
        }),
      );
    });

    it('should throw NotFoundException when the note does not exist', async () => {
      mockPrismaService.note.findUnique.mockResolvedValue(null);

      expect(service.findOne('not-existing-cuid')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update the note with the given ID', async () => {
      const updatednote = {
        ...mockNote,
        name: 'new-name',
      };

      mockPrismaService.note.findUnique.mockResolvedValue(mockNote);
      mockPrismaService.note.update.mockResolvedValue(updatednote);

      const newnote = await service.update('note-cuid', updatednote);

      expect(newnote).toEqual(updatednote);
      expect(mockPrismaService.note.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            id: 'note-cuid',
          },
          data: {
            ...updatednote,
          },
        }),
      );
    });

    it('should return NotFoundException when the note does not exist', async () => {
      const updatednote = {
        ...mockNote,
        type: 'CREDITO' as NoteType,
      };

      mockPrismaService.note.findUnique.mockResolvedValue(null);

      expect(service.update('non-existing-cuid', updatednote)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should not call the update method when the note does not exist', async () => {
      mockPrismaService.note.findUnique.mockResolvedValue(null);

      expect(mockPrismaService.note.update).not.toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove the note with the given ID', async () => {
      mockPrismaService.note.findUnique.mockResolvedValue(mockNote);
      mockPrismaService.note.delete.mockResolvedValue(mockNote);

      const deletenote = await service.remove('note-cuid');

      expect(deletenote).toEqual(mockNote);
      expect(mockPrismaService.note.delete).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            id: 'note-cuid',
          },
        }),
      );
    });

    it('should return NotFoundException and not call delete method when the note does not exist', async () => {
      mockPrismaService.note.findUnique.mockResolvedValue(null);

      await expect(service.remove('non-existing-cuid')).rejects.toThrow(
        NotFoundException,
      );
      expect(mockPrismaService.note.delete).not.toHaveBeenCalled();
    });
  });
});
