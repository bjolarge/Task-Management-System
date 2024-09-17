import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Listing } from './entities/listing.entity';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item) private readonly itemsRepository:Repository<Item>,
    private entityManager:EntityManager
  ){}

  create(createItemDto: CreateItemDto) {
    const listing = new Listing({
      ...createItemDto.listing,
      rating:0
    });

    const items = new Item({
      ...createItemDto,
      comments:[],
      listing
    });

    return this.entityManager.save(items);
   // return 'This action adds a new item';
  }

  findAll() {
    return this.itemsRepository.find();
  }

  findOne(id: number) {
  const item = this.itemsRepository.findOne({where:{id}, relations:{listing:true, comments:true}});
  if(!item){
    throw new NotFoundException(`The item with this ${id} cannot be found`);
  }
  else{
    return item;
  }
  }

  // update(id: number, updateItemDto: UpdateItemDto) {
  //   return `This action updates a #${id} item`;
  // }

  async update(id: number, updateItemDto: UpdateItemDto) {
   const item = await this.itemsRepository.findOneBy({id});
   item.public = updateItemDto.public;

   const comments = updateItemDto.comments.map(
    (createCommentDto)=>new Comment(createCommentDto),
   );
   item.comments = comments;
   await this.entityManager.save(item);
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
