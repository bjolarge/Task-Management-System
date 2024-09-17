import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LaymentService } from './layment.service';
import { CreateLaymentDto } from './dto/create-layment.dto';
import { UpdateLaymentDto } from './dto/update-layment.dto';

@Controller('layment')
export class LaymentController {
  constructor(private readonly laymentService: LaymentService) {}

  @Post('make')
  async makePayment() {
    return this.laymentService.makePayment();
  }
}
