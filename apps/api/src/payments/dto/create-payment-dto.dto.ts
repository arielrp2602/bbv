import { PaymentMethod } from '@prisma/client';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreatePaymentDto {
  @IsString() noteId!: string;
  @IsNumber() @IsPositive() amount!: number;
  @IsEnum(PaymentMethod) paymentMethod!: PaymentMethod;
  @IsString() @IsOptional() clipReference?: string;
}
