import { Injectable } from '@nestjs/common';
import { CreateFrozenDto } from './dto/create-frozen.dto';
import { UpdateFrozenDto } from './dto/update-frozen.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Frozen } from './entities/frozen.entity';
import { EntityManager, Like, Repository } from 'typeorm';
import { Lorry } from './entities/lorry.entity';

@Injectable()
export class FrozenService {
  constructor(
    @InjectRepository(Frozen) private readonly frozenRepository:Repository<Frozen>,
    private readonly entityManager:EntityManager
  ){}
  async create(createFrozenDto: CreateFrozenDto) {
  const lorry = new Lorry({
    ...createFrozenDto.lorry,
  });

  const frozen = new Frozen({
    ...createFrozenDto,
    lorry
  });

  return await this.entityManager.save(frozen);
  }

  // to enable search functionality
  async searchItems(query: string): Promise<Frozen[]> {
    return await this.frozenRepository.find({
      where: [
        { name: Like(`%${query}%`) },
        //{ description: Like(`%${query}%`) },
      ],
    });
  }

  findAll() {
    return this.frozenRepository.find();
  }

  findOne(id: number) {
    const frozen = this.frozenRepository.findOne({where:{id}, relations:{lorry:true}});
    if(!frozen){
      return `The Frozen with ${id} requested for does not exist`;
    }
    return frozen;
  }

  update(id: number, updateFrozenDto: UpdateFrozenDto) {
    return `This action updates a #${id} frozen`;
  }

  remove(id: number) {
    return `This action removes a #${id} frozen`;
  }
}
