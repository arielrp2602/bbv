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
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NotesService } from './notes.service';

@UseGuards(JwtAuthGuard)
@Controller('notes')
export class NotesController {
  constructor(private ns: NotesService) {}

  @Post()
  create(@Body() dto: CreateNoteDto) {
    return this.ns.create(dto);
  }

  @Get()
  findAll() {
    return this.ns.findAll();
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
