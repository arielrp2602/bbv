import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNoteDto, CreateNoteItemDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { CustomersService } from '../customers/customers.service';
import { NoteType } from '@prisma/client';

interface Filters {
  type?: NoteType;
  customerId?: string;
  page: number;
  limit: number;
}

@Injectable()
export class NotesService {
  constructor(
    private ps: PrismaService,
    private cs: CustomersService,
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

  async create(dto: CreateNoteDto) {
    const { customerId, items, type } = dto;

    const subTotal = this.roundNumber(this.calculateSubTotal(items));
    const total = this.roundNumber(subTotal * 0.9);
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 45);

    const customer = await this.cs.findOne(customerId);

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return await this.ps.note.create({
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

    return this.ps.note.findMany({
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
  }

  async findOne(id: string) {
    const note = await this.ps.note.findUnique({
      where: { id },
      include: {
        customer: true,
        items: true,
        payments: true,
      },
    });

    if (!note) {
      throw new NotFoundException('Note not found');
    }

    return note;
  }

  async update(id: string, dto: UpdateNoteDto) {
    await this.findOne(id);

    return this.ps.note.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.ps.note.delete({
      where: { id },
    });
  }
}
