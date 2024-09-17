import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSlipDto } from './dto/create-slip.dto';
import { UpdateSlipDto } from './dto/update-slip.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Slip } from './entities/slip.entity';
import { EntityManager, Repository } from 'typeorm';
import { Flip } from './entities/flip.entity';
import { Tip } from './entities/tip.entity';
import { Tag } from './entities/tag.entity';

@Injectable()
export class SlipsService {
  constructor(
    @InjectRepository(Slip)private readonly slipRepository:Repository<Slip>,
    private readonly entityManager:EntityManager
  ){}

  create(createSlipDto: CreateSlipDto) {
    const flip = new Flip({
      ...createSlipDto.flip
    });

    const tags = createSlipDto.tags.map(createSlipDto=>new Tag(createSlipDto),
  ); 

    const slip = new Slip({
      ...createSlipDto,
      slip:[],
      tags,
      flip
    });

    return this.entityManager.save(slip);
    //return 'This action adds a new slip';
  }

  findAll() {
    return `This action returns all slips`;
  }

  findOne(id: number) {
    const slipOne = this.slipRepository.find({where:{id}, 
      relations:{flip:true,slip:true, tags:true}});
    if(!slipOne){
      throw new NotFoundException(`The slipOne with this ${id} cannot be found`);
    }
    return slipOne;
    //return `This action returns a #${id} slip`;
  }

  async update(id: number, updateSlipDto: UpdateSlipDto) {
    const slip = await this.slipRepository.findOneBy({id});
    const lomment = updateSlipDto.slip.map(
        (createCommentDto)=>new Tip(createCommentDto),
       );
       //lock.lomment = lomment;
       slip.slip = lomment;
     await this.entityManager.save(slip);
    //return `This action updates a #${id} slip`;
  }

  remove(id: number) {
    return `This action removes a #${id} slip`;
  }
}
