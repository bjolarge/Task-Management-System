import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DenService } from './den.service';
import { CreateDenDto } from './dto/create-den.dto';
import { UpdateDenDto } from './dto/update-den.dto';

@Controller('den')
export class DenController {
  constructor(private readonly denService: DenService) {}

  @Post()
  create(@Body() createDenDto: CreateDenDto) {
    return this.denService.create(createDenDto);
  }

  @Get()
  findAll() {
    return this.denService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.denService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDenDto: UpdateDenDto) {
    return this.denService.update(+id, updateDenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.denService.remove(+id);
  }
}
