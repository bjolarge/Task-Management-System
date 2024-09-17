import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDenDto } from './dto/create-den.dto';
import { UpdateDenDto } from './dto/update-den.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Den } from './entities/den.entity';
import { EntityManager, Repository } from 'typeorm';
import { Lents } from './entities/lents.entity';
import { CreateCommentator } from './dto/create-commentator.dto';
import { Commentator } from './entities/commentator.entity';

@Injectable()
export class DenService {
  constructor(
    @InjectRepository(Den) private readonly denRepository:Repository<Den>,
    private readonly entityManager:EntityManager,
  ){}

  create(createDenDto: CreateDenDto) {
  const lentDents = new Lents({
    ...createDenDto.lentDents
  });

  const den = new Den({
    ...createDenDto,
    comments:[],
    lentDents
  });

  return this.entityManager.save(den);
  }

  findAll() {
    return this.denRepository.find();
  }

  findOne(id: number) {
  const OneDen = this.denRepository.findOne({where:{id}, relations:{lentDents:true, comments:true}});
  if(!OneDen){
    throw new NotFoundException(`The ${id} requested for doesn't exist`);
  }else{
    return OneDen;
  }
  }

  // update(id: number, updateDenDto: UpdateDenDto) {
  //   return `This action updates a #${id} den`;
  // }

 async update(id: number, updateDenDto: UpdateDenDto) {
     const item = await this.denRepository.findOneBy({id});
     //item.detailedAddress = updateDenDto.public;
     const comments = updateDenDto.comments.map((createCommentDto)=>new Commentator(createCommentDto),);
    item.comments = comments;
    await this.entityManager.save(item)
    }

    // async update(id: number, updateDenDto: UpdateDenDto) {
    //   const existingden= await this.denRepository.preload({
    //     id:+id,
    //     ...updateDenDto,
    //   });
    //   if(!existingden){
    //     throw new NotFoundException(`The den with the given ${id} not found`);
    //   }
    //   return this.denRepository.save(existingden);
      
    // }

  remove(id: number) {
    return `This action removes a #${id} den`;
  }
}
