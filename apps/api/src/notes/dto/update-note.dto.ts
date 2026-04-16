import { NoteType } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateNoteDto {
  @IsOptional()
  @IsEnum(NoteType)
  type?: NoteType;
}
