import { Injectable } from '@nestjs/common';
import { CreatePanelDto } from './dto/create-panel.dto';
import { UpdatePanelDto } from './dto/update-panel.dto';
import { Chanters } from './entities/chanters.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Panel } from './entities/panel.entity';

@Injectable()
export class PanelsService {
  constructor(
    @InjectRepository(Panel)
    private panelsRepository:Repository<Panel>,
    private readonly entityManager:EntityManager
  ) {}
  create(createPanelDto: CreatePanelDto) {
    const chanters = new Chanters({
      ...createPanelDto.chanters
    });

    const panel = new Panel({
      ...createPanelDto,
      chanters
    });

    return this.entityManager.save(panel);
  }

  findAll() {
    return this.panelsRepository.find();
  }

  findOne(id: number) {
    const panel = this.panelsRepository.findOne({where:{id}, relations:{chanters:true}})
  }

  update(id: number, updatePanelDto: UpdatePanelDto) {
    return `This action updates a #${id} panel`;
  }

  remove(id: number) {
    return `This action removes a #${id} panel`;
  }
}
