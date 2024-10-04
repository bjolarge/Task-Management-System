import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as QRCode from 'qrcode';
import * as fs from 'fs';
import * as path from 'path';
import { QrCode } from './entities/qr-code.entity';

@Injectable()
export class QrCodeService {
  constructor(
    @InjectRepository(QrCode)
    private qrCodeRepository: Repository<QrCode>,
  ) {}

  async create(url: string): Promise<QrCode> {
    const qrCodeImagePath = path.join(__dirname, `../../uploads/${Date.now()}.png`);
    await QRCode.toFile(qrCodeImagePath, url);

    const qrCode = this.qrCodeRepository.create({
      url,
      qrCodeImage: qrCodeImagePath, // Save the path in the database
    });
    
    return this.qrCodeRepository.save(qrCode);
  }

  async findById(id: string): Promise<QrCode> {
    const qrCode = await this.qrCodeRepository.findOne({ where: { id: Number(id) } });
    if (!qrCode) {
      throw new NotFoundException('QR Code not found');
    }
    return qrCode;
  }
}
