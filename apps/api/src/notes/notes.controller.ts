import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NotesService } from './notes.service';
import { NoteType } from '@prisma/client';

@UseGuards(JwtAuthGuard)
@Controller('notes')
export class NotesController {
  constructor(private ns: NotesService) {}

  @Post()
  create(@Body() dto: CreateNoteDto) {
    return this.ns.create(dto);
  }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(25), ParseIntPipe) limit: number,
    @Query('type') type?: NoteType,
    @Query('customerId') customerId?: string,
  ) {
    return this.ns.findAll({
      type,
      customerId,
      page,
      limit,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ns.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateNoteDto) {
    return this.ns.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ns.remove(id);
  }
}
