import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(private ps: PrismaService) {}

  async create(dto: CreateCustomerDto) {
    return await this.ps.customer.create({ data: dto });
  }

  async findAll() {
    return await this.ps.customer.findMany({
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

  async update(id: string, dto: UpdateCustomerDto) {
    await this.findOne(id);

    return this.ps.customer.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.ps.customer.delete({ where: { id } });
  }
}
