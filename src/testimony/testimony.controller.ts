import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UseGuards } from '@nestjs/common';
import { TestimonyService } from './testimony.service';
import { CreateTestimonyDto } from './dto/create-testimony.dto';
import { UpdateTestimonyDto } from './dto/update-testimony.dto';

import { Testimony } from './entities/testimony.entity';

@Controller('testimony')
export class TestimonyController {
  constructor(private readonly testimonyService: TestimonyService) {}

  //@UseGuards(JwtAuthenticationGuard)
  @Post()
  create(@Body() createTestimonyDto: CreateTestimonyDto) {
    return this.testimonyService.create(createTestimonyDto);
  }

  @Get()
  findAll() {
    return this.testimonyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const testimony =  await this.testimonyService.findOne(id);
    if(!testimony){
      throw new NotFoundException(`Testimony with the given id ${id} not found`);
    }
    return testimony;
  }

  @Patch(':id')
 
  update(@Param('id') id: string, @Body() updateTestimonyDto: UpdateTestimonyDto) {
    return this.testimonyService.update(id, updateTestimonyDto);
  }

  // only the admin can delete the testimony
  @Delete(':id')
  remove(@Param('id') id: string) {
    const customertestimony =  this.testimonyService.remove(id);
    if(!customertestimony){
      //console.log('unauthorized');
      throw new NotFoundException(`The customer testimony with this #${id} not found`);
    }
    return customertestimony;
  }
  
}
