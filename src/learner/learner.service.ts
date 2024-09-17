import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLearnerDto } from './dto/create-learner.dto';
import { UpdateLearnerDto } from './dto/update-learner.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Learner } from './entities/learner.entity';
import { EntityManager, Repository } from 'typeorm';
import { Harpner } from './entities/harpner.entity';
import { Lept } from './entities/lept.entity';

@Injectable()
export class LearnerService {
  constructor(
    @InjectRepository(Learner) private readonly learnerRepository:Repository<Learner>,
    private readonly entityManager:EntityManager
  ){}

  create(createLearnerDto: CreateLearnerDto) {
    const  learnersApt = new Harpner({
      ...createLearnerDto.learnersApt,
      pickupLocation:'Ikeja',
    });

    const learner = new Learner({
      ...createLearnerDto,
      learnersApt
    });

    return this.entityManager.save(learner);
  }

  findAll() {
    return this.learnerRepository.find();
  }

  findOne(id: number) {
    const learner = this.learnerRepository.findOne({where:{id}, relations:{learnersApt:true}});
    if(!learner){
      throw new NotFoundException(`The Learner with this ${id} does not exist`);
    }
    else{
      return learner;
    }
  //const learner = this.learnerRepository.findOne({where:{id}, relations:{learnersApt:true}})
  }

  // update(id: number, updateLearnerDto: UpdateLearnerDto) {
  //   return `This action updates a #${id} learner`;
  // }

  async update(id: number, updateItemDto:UpdateLearnerDto) {
    const item = await this.learnerRepository.findOneBy({id});
   // item.public = updateItemDto.public;
 
    const comments = updateItemDto.learnersclub.map(
     (createCommentDto)=>new Lept(createCommentDto),
    );
    item.learnersclub = comments;
    await this.entityManager.save(item);
   }

  remove(id: number) {
    return `This action removes a #${id} learner`;
  }
}
