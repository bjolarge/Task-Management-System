import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlentsService } from './plents.service';
import { CreatePlentDto } from './dto/create-plent.dto';
import { UpdatePlentDto } from './dto/update-plent.dto';

@Controller('plents')
export class PlentsController {
  constructor(private readonly plentsService: PlentsService) {}

  @Post()
  create(@Body() createPlentDto: CreatePlentDto) {
    return this.plentsService.create(createPlentDto);
  }

  @Get()
  findAll() {
    return this.plentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.plentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlentDto: UpdatePlentDto) {
    return this.plentsService.update(+id, updatePlentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.plentsService.remove(+id);
  }
}
