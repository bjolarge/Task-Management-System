import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeskService } from './desk.service';
import { CreateDeskDto } from './dto/create-desk.dto';
import { UpdateDeskDto } from './dto/update-desk.dto';

@Controller('desk')
export class DeskController {
  constructor(private readonly deskService: DeskService) {}

  @Post()
  create(@Body() createDeskDto: CreateDeskDto) {
    return this.deskService.create(createDeskDto);
  }

  @Get()
  findAll() {
    return this.deskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deskService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeskDto: UpdateDeskDto) {
    return this.deskService.update(+id, updateDeskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deskService.remove(+id);
  }
}
