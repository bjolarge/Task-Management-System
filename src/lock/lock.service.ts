import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLockDto } from './dto/create-lock.dto';
import { UpdateLockDto } from './dto/update-lock.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Pank } from './entities/pank.entity';
import { Lock } from './entities/lock.entity';
import { Lomment } from './entities/lomment.entity';

@Injectable()
export class LockService {
  constructor(
    @InjectRepository(Lock)private readonly lockRepository:Repository<Lock>,
    private readonly entityManager:EntityManager,
  ){}
  create(createLockDto: CreateLockDto) {
    const pank = new Pank({
      ...createLockDto.pank
    });

    const lock = new Lock({
      ...createLockDto,
      pank
    });

    return this.entityManager.save(lock);
    //return 'This action adds a new lock';
  }

  findAll() {
    return this.lockRepository.find({relations:{pank:true, lomment:true}});
  }

 async findOne(id: number) {
    const lockOne = await this.lockRepository.find({where:{id}, relations:{pank:true, lomment:true}});
    if(!lockOne){
      throw new NotFoundException(`The lockOne with this ${id} cannot be found`);
    }
    return lockOne;
    //return `This action returns a #${id} lock`;
  }

 async update(id: number, updateLockDto: UpdateLockDto) {
    const lock = await this.lockRepository.findOneBy({id});
    //item.public = updateItemDto.public;
 
    const lomment = updateLockDto.lomment.map(
     (createCommentDto)=>new Lomment(createCommentDto),
    );
    lock.lomment = lomment;
    //item.comments = comments;
    await this.entityManager.save(lock);
    //return `This action updates a #${id} lock`;
  }

  remove(id: number) {
    return `This action removes a #${id} lock`;
  }
}
