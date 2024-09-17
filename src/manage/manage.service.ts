import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateManageDto } from './dto/create-manage.dto';
import { UpdateManageDto } from './dto/update-manage.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Manage } from './entities/manage.entity';
import { Management } from './entities/management.entity';
import { Comment } from './entities/comment.entity';

@Injectable()
export class ManageService {
  constructor(@InjectRepository(Manage)
  private readonly manageRepository:Repository<Manage>,
  private readonly entityManager:EntityManager,
){}
  create(createManageDto: CreateManageDto) {
    const management = new Management({
      ...createManageDto.management,
      rating:0,
    });

    const manage = new Manage({
      ...createManageDto,
      comments:[],
      management 
    });

    return this.entityManager.save(manage)
  }

  findAll() {
    return this.manageRepository.find();
  }

  // async findOne(id: number) {
  //   return this.manageRepository.findOne({
  //     where:{id},
  //     relations:{comments:true, management:true}
  //   })
  // }

  findOne(id: number) {
    const item = this.manageRepository.findOne({
      where:{id},
      relations:{ comments:true, management:true},
    });
    if(!item){
      throw new NotFoundException(`Item with the given #${id} not found`);
    }
    return item;
  }

  // update(id: number, updateManageDto: UpdateManageDto) {
  //   return `This action updates a #${id} manage`;
  // }

  // async update(id: number, updateManageDto: UpdateManageDto) {
  //    const item = await this.manageRepository.findOneBy({id});
  //    const comments = updateManageDto.comments.map((createCommentDto)=>new Comment(createCommentDto));
  //    item.comments = comments;
  //    await this.entityManager.save(item);
  //   }

  async update(id: number, updateBlogpostDto: UpdateManageDto) {
    const existingblogpost= await this.manageRepository.preload({
      id:+id,
      ...updateBlogpostDto,
    });
    if(!existingblogpost){
      throw new NotFoundException(`The blogpost with the given ${id} not found`);
    }
    return this.manageRepository.save(existingblogpost);
    
  }

  remove(id: number) {
    return `This action removes a #${id} manage`;
  }
}
