import { Injectable } from '@nestjs/common';
import { CreateDeskDto } from './dto/create-desk.dto';
import { UpdateDeskDto } from './dto/update-desk.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Desk } from './entities/desk.entity';
import { EntityManager, Repository } from 'typeorm';
import { Lest } from './entities/lest.entity';
import { Item } from 'src/items/entities/item.entity';
import { Commenters } from './entities/commenters.entity';

@Injectable()
export class DeskService {
  constructor(
    @InjectRepository(Desk)private readonly deskRepository:Repository<Desk>,
    private readonly entityManager:EntityManager
 ){}

  create(createDeskDto: CreateDeskDto) {
    const lesting = new Lest({
      ...createDeskDto.lesting
    });

    const desk = new Desk({
      ...createDeskDto,
      comments:[],
      lesting
    });

    return this.entityManager.save(desk);
  }

  findAll() {
    return this.deskRepository.find();
  }

  findOne(id: number) {
  const desk = this.deskRepository.findOne({where:{id}, relations:{lesting:true, comments:true}})
  if(!desk){
    return `The desk with this ${id} cannot be found`;
  } 
  return desk;
  }

  // update(id: number, updateDeskDto: UpdateDeskDto) {
  //   return `This action updates a #${id} desk`;
  // }

  async update(id: number, updateDeskDto: UpdateDeskDto) {
   const item = await this.deskRepository.findOneBy({id});
   const comments = updateDeskDto.comments.map((createCommenterDto)=>new Commenters(createCommenterDto));
   item.comments = comments;
   await this.entityManager.save(item);
  }

  remove(id: number) {
    return `This action removes a #${id} desk`;
  }
}
