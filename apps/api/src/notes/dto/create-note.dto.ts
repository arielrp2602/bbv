import { NoteItem, NoteType } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNumber,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateNoteItemDto {
  @IsString()
  description!: string;

  @IsInt()
  @IsPositive()
  qty!: number;

  @IsNumber()
  @IsPositive()
  unitPrice!: number;
}

export class CreateNoteDto {
  @IsString()
  customerId!: string;

  @IsEnum(NoteType)
  type!: NoteType;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateNoteItemDto)
  items!: CreateNoteItemDto[];
}
