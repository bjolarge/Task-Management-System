import { Injectable } from '@nestjs/common';
import { CreateScaleDto } from './dto/create-scale.dto';
import { UpdateScaleDto } from './dto/update-scale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Scale } from './entities/scale.entity';
import { Scaling } from './entities/scaling.entity';

@Injectable()
export class ScalesService {
  constructor(
  @InjectRepository(Scale)
  private readonly scalesRepository:Repository<Scale>,
  private entityManager:EntityManager
){

  }
  create(createScaleDto: CreateScaleDto) {
    const scaling = new Scaling({
      ...createScaleDto.scaling,
      color:'red',

    });

    const scale = new Scale({
      ...createScaleDto,
      scaling
    });

    return this.entityManager.save(scale);
  }

  findAll() {
    return this.scalesRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} scale`;
  }

  update(id: number, updateScaleDto: UpdateScaleDto) {
    return `This action updates a #${id} scale`;
  }

  remove(id: number) {
    return `This action removes a #${id} scale`;
  }
}
