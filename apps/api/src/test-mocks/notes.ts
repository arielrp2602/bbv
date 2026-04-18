import { NoteType, PaymentMethod } from '@prisma/client';
import { mockPayment } from './payments';

export const mockItem1 = {
  id: 'note-item-1-cuid',
  description: 'note-item-1-cuid',
  qty: 5,
  unitPrice: 15,
  total: 75,
  createdAt: Date.now(),
  noteId: 'note-cuid',
};

export const mockItem2 = {
  id: 'note-item-2-cuid',
  description: 'note-item-2-cuid',
  qty: 6,
  unitPrice: 10,
  total: 60,
  createdAt: Date.now(),
  noteId: 'note-cuid',
};

export const mockNoteItems = [mockItem1, mockItem2];

export const dueDate = new Date();
dueDate.setDate(dueDate.getDate() + 45);

export const mockNote = {
  id: 'note-cuid',
  items: mockNoteItems,
  payments: [],
  type: 'CONTADO' as NoteType,
  dueDate,
  total: (mockItem1.total + mockItem2.total) * 0.9,
  subTotal: mockItem1.total + mockItem2.total,
  customerId: 'customer-cuid',
  createdAt: new Date(),
};

export const mockNoteWithPayments = {
  id: 'note-cuid',
  items: mockNoteItems,
  payments: [mockPayment], // 121.5
  type: 'CONTADO' as NoteType,
  dueDate,
  total: (mockItem1.total + mockItem2.total) * 0.9, // 121.5
  subTotal: mockItem1.total + mockItem2.total, // 135
  customerId: 'customer-cuid',
  createdAt: new Date(),
};
