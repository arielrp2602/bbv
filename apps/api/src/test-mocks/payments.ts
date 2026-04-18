import { PaymentMethod } from '@prisma/client';

export const mockPayment = {
  id: 'payment-cuid',
  amount: 121.5,
  paymentMethod: 'EFECTIVO' as PaymentMethod,
  noteId: 'note-cuid',
  createdAt: Date.now(),
};

export const mockInvalidPayment = {
  id: 'invalid-payment-cuid',
  amount: 121.5,
  paymentMethod: 'EFECTIVO' as PaymentMethod,
  noteId: 'note-cuid',
  createdAt: Date.now(),
};
