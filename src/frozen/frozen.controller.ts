import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FrozenService } from './frozen.service';
import { CreateFrozenDto } from './dto/create-frozen.dto';
import { UpdateFrozenDto } from './dto/update-frozen.dto';
import { Frozen } from './entities/frozen.entity';

@Controller('frozen')
export class FrozenController {
  constructor(private readonly frozenService: FrozenService) {}

  // Search frozen items by name
  @Get('items')
  async searchItems(@Query('name') query: string): Promise<Frozen[]> {
    return this.frozenService.searchItems(query);
  }

  @Post()
  create(@Body() createFrozenDto: CreateFrozenDto) {
    return this.frozenService.create(createFrozenDto);
  }

  @Get()
  findAll() {
    return this.frozenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.frozenService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFrozenDto: UpdateFrozenDto) {
    return this.frozenService.update(+id, updateFrozenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.frozenService.remove(+id);
  }
}
