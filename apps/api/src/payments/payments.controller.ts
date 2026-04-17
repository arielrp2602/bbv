import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment-dto.dto';

@UseGuards(JwtAuthGuard)
@Controller('payments')
export class PaymentsController {
  constructor(private ps: PaymentsService) {}

  @Post()
  create(@Body() dto: CreatePaymentDto) {
    return this.ps.create(dto);
  }

  @Get(':id/notes')
  findByNote(@Param('id') id: string) {
    return this.ps.findByNote(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ps.remove(id);
  }
}
