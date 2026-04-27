import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment-dto.dto';
import { NotesService } from '../notes/notes.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PaymentsService {
  constructor(
    private ps: PrismaService,
    private ns: NotesService,
  ) {}

  async create(dto: CreatePaymentDto) {
    const note = await this.findNoteById(dto.noteId);

    const totalPaidAmount = note.payments.reduce(
      (sum, payment) => sum + Number(payment.amount),
      0,
    );
    const balance = Number(note.total) - totalPaidAmount;

    if (dto.amount > balance) {
      throw new BadRequestException(
        'La cantidad pagada es mayor al balance de la nota',
      );
    }

    const isFirstPayment = note.payments.length === 0;
    const coversFullAmount = dto.amount >= Number(note.subTotal);

    if (isFirstPayment && coversFullAmount) {
      dto.amount = Number(note.total);
    }

    return await this.ps.payment.create({
      data: {
        amount: dto.amount,
        paymentMethod: dto.paymentMethod,
        clipReference: dto.clipReference,
        note: {
          connect: {
            id: dto.noteId,
          },
        },
      },
    });
  }

  async findByNote(noteId: string) {
    const note = await this.findNoteById(noteId);

    return note.payments;
  }

  async remove(id: string) {
    const payment = await this.ps.payment.findUnique({ where: { id } });

    if (!payment) {
      throw new NotFoundException('Pago no encontrado');
    }

    return this.ps.payment.delete({ where: { id } });
  }

  private async findNoteById(id: string) {
    return await this.ns.findOne(id);
  }
}
