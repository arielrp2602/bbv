import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@UseGuards(JwtAuthGuard)
@Controller('customers')
export class CustomersController {
  constructor(private cs: CustomersService) {}

  @Post()
  create(@Body() dto: CreateCustomerDto) {
    return this.cs.create(dto);
  }

  @Get()
  findAll() {
    return this.cs.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cs.findOne(id);
  }

  @Get(':id/notes')
  findNotesByCustomer(@Param('id') id: string) {
    return this.cs.findNotesByCustomer(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCustomerDto) {
    return this.cs.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cs.remove(id);
  }
}
