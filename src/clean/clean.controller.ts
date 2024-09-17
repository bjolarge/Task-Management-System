import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CleanService } from './clean.service';
import { CreateCleanDto } from './dto/create-clean.dto';
import { UpdateCleanDto } from './dto/update-clean.dto';

@Controller('clean')
export class CleanController {
  constructor(private readonly cleanService: CleanService) {}

  @Post()
  create(@Body() createCleanDto: CreateCleanDto) {
    return this.cleanService.create(createCleanDto);
  }

  @Get()
  findAll() {
    return this.cleanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cleanService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCleanDto: UpdateCleanDto) {
    return this.cleanService.update(+id, updateCleanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cleanService.remove(+id);
  }
}
