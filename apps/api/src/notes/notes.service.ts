import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNoteDto, CreateNoteItemDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { CustomersService } from '../customers/customers.service';
import { Note, NoteType, Payment } from '@prisma/client';
import { PaymentsService } from '../payments/payments.service';

interface Filters {
  type?: NoteType;
  customerId?: string;
  page: number;
  limit: number;
}

interface NoteWithPayments extends Note {
  payments: Payment[];
}

@Injectable()
export class NotesService {
  constructor(
    private prismaService: PrismaService,
    private customerService: CustomersService,
  ) {}

  private roundNumber(num: number) {
    return Math.round(num * 100) / 100;
  }

  private calculateSubTotal(items: CreateNoteItemDto[]) {
    return items.reduce(
      (sum, item) => sum + item.qty * Number(item.unitPrice),
      0,
    );
  }

  private computeNote(note: NoteWithPayments) {
    const totalPayments = note.payments.reduce(
      (sum, payment) => sum + Number(payment.amount),
      0,
    );
    const balance = Number(note.total) - totalPayments;
    const today = new Date();
    const dueDate = new Date(note.dueDate);
    const daysLeft = Math.ceil(
      (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );

    let status = '';
    if (balance === 0) {
      status = 'PAGADA';
    } else if (daysLeft <= 0) {
      status = 'VENCIDA';
    } else if (daysLeft <= 10) {
      status = 'PROXIMA_A_VENCER';
    } else {
      status = 'PENDIENTE';
    }

    return {
      ...note,
      balance,
      status,
      daysLeft,
    };
  }

  async create(dto: CreateNoteDto) {
    const { customerId, items, type } = dto;

    const subTotal = this.roundNumber(this.calculateSubTotal(items));
    const total = this.roundNumber(subTotal * 0.9);
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 45);

    await this.customerService.findOne(customerId);

    return await this.prismaService.note.create({
      data: {
        type,
        subTotal,
        total,
        dueDate,
        customer: {
          connect: {
            id: customerId,
          },
        },
        items: {
          createMany: {
            data: items.map((item) => ({
              ...item,
              total: this.roundNumber(item.qty * item.unitPrice),
            })),
          },
        },
      },
    });
  }

  async findAll({ type, customerId, page, limit }: Filters) {
    const where = {
      ...(type && { type }),
      ...(customerId && { customerId }),
    };

    const notes = await this.prismaService.note.findMany({
      where,
      include: {
        customer: true,
        items: true,
        payments: true,
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    return notes.map((note) => this.computeNote(note));
  }

  async findOne(id: string) {
    const note = await this.prismaService.note.findUnique({
      where: { id },
      include: {
        customer: true,
        items: true,
        payments: true,
      },
    });

    if (!note) {
      throw new NotFoundException('Nota no encontrada');
    }

    return this.computeNote(note);
  }

  async update(id: string, dto: UpdateNoteDto) {
    await this.findOne(id);

    return this.prismaService.note.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prismaService.note.delete({
      where: { id },
    });
  }
}
