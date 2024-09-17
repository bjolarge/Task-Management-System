import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlentDto } from './dto/create-plent.dto';
import { UpdatePlentDto } from './dto/update-plent.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Plent } from './entities/plent.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class PlentsService {
  constructor(@InjectRepository(Plent)
  private readonly plentRepository:Repository< Plent>,
  private readonly entityManager:EntityManager,){}
  async create(createPlentDto: CreatePlentDto) {
    const plent =  await new Plent({
      ...createPlentDto
    });
    return this.entityManager.save(plent);
  }

  findAll() {
    return this.plentRepository.find();
  }

  findOne(id: number) {
    const plents = this.plentRepository.findOne({where:{id}});
    if(!plents){
      throw new NotFoundException(`The plents with the ${id} not found`)
    }
    return plents;
  }

  async update(id: number, updatePlentDto: UpdatePlentDto) {
    const existingPlent= await this.plentRepository.preload({
      id:+id,
      ...updatePlentDto,
    });
    if(!existingPlent){
      throw new NotFoundException(`The blogpost with the given ${id} not found`);
    }
    return this.plentRepository.save(existingPlent);
  }

  remove(id: number) {
    return `This action removes a #${id} plent`;
  }
}
