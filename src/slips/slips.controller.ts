import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SlipsService } from './slips.service';
import { CreateSlipDto } from './dto/create-slip.dto';
import { UpdateSlipDto } from './dto/update-slip.dto';

@Controller('slips')
export class SlipsController {
  constructor(private readonly slipsService: SlipsService) {}

  @Post()
  create(@Body() createSlipDto: CreateSlipDto) {
    return this.slipsService.create(createSlipDto);
  }

  @Get()
  findAll() {
    return this.slipsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.slipsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSlipDto: UpdateSlipDto) {
    return this.slipsService.update(+id, updateSlipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.slipsService.remove(+id);
  }
}
