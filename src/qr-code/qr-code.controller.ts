import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { QrCodeService } from './qr-code.service';
import { CreateQrCodeDto } from './dto/create-qr-code.dto';
import { UpdateQrCodeDto } from './dto/update-qr-code.dto';
import { QrCode } from './entities/qr-code.entity';
import * as path from 'path'; 

@Controller('qr-code')
export class QrCodeController {
  constructor(private readonly qrCodeService: QrCodeService) {}

  @Post()
  async create(@Body('url') url: string): Promise<{ url: string; imageUrl: string }> {
    const qrCode = await this.qrCodeService.create(url);
    return {
      url: qrCode.url,
      imageUrl: `http://localhost:3008/uploads/${path.basename(qrCode.qrCodeImage)}`,
    };
  }

  @Get(':id')
  async getQrCode(@Param('id') id: string): Promise<{ imageUrl: string }> {
    const qrCode = await this.qrCodeService.findById(id); 
    if (!qrCode) {
      throw new NotFoundException('QR Code not found');
    }
    return {
      imageUrl: `http://localhost:3000/uploads/${path.basename(qrCode.qrCodeImage)}`,
    };
  }
}
