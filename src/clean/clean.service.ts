import { Injectable } from '@nestjs/common';
import { CreateCleanDto } from './dto/create-clean.dto';
import { UpdateCleanDto } from './dto/update-clean.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Clean } from './entities/clean.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class CleanService {
  constructor(
    @InjectRepository(Clean) private readonly cleanRepository:Repository<Clean>,
    private readonly entityManager:EntityManager,
  ){}

  create(createCleanDto: CreateCleanDto) {
    // const savers  = new Clean({

    // });
    const amount = 200;
    switch (amount) {
      // case 100:
      //   return `This amount is not allowed`;
       // break;
        case 200:
          return this.entityManager.save(amount);
          break;
      default:
        return `Sorry we cannot not handle this amount`
        break;
    }
  }

  findAll() {
    return `This action returns all clean`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clean`;
  }

  update(id: number, updateCleanDto: UpdateCleanDto) {
    return `This action updates a #${id} clean`;
  }

  remove(id: number) {
    return `This action removes a #${id} clean`;
  }
}
