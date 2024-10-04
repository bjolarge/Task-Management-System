import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Purchase } from './entities/purchase.entity';

@Injectable()
export class PurchasesService {
  constructor(
    @InjectRepository(Purchase)
    private purchasesRepository: Repository<Purchase>,
  ) {}

  async create(purchase: Partial<Purchase>): Promise<Purchase> {
    return this.purchasesRepository.save(purchase);
  }

  // async findLatest(): Promise<Purchase> {
  //   return this.purchasesRepository.findOne({
  //     order: { createdAt: 'DESC' },
  //   });
  // }

  async findLatest(): Promise<Purchase[]> {
    return this.purchasesRepository.find({
      order: {
        item: 'ASC', // Specify ascending order
      },
    });
  }
}
