import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Prisma } from '@prisma/client';

interface Filters {
  name?: string;
}

@Injectable()
export class CustomersService {
  constructor(private ps: PrismaService) {}

  async create(dto: CreateCustomerDto) {
    return await this.ps.customer.create({ data: dto });
  }

  async findAll({ name }: Filters) {
    const where = {
      ...(!!name && {
        name: {
          contains: name,
          mode: Prisma.QueryMode.insensitive,
        },
      }),
    };

    return await this.ps.customer.findMany({
      where,
      include: {
        notes: true,
      },
    });
  }

  async findOne(id: string) {
    const customer = await this.ps.customer.findUnique({ where: { id } });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return customer;
  }

  async findNotesByCustomer(customerId: string) {
    return await this.ps.note.findMany({
      where: { customerId },
      include: {
        items: true,
        payments: true,
      },
    });
  }

  async update(id: string, dto: UpdateCustomerDto) {
    await this.findOne(id);

    return this.ps.customer.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.ps.customer.delete({ where: { id } });
  }
}
