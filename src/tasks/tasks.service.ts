import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../tasks/entities/task.entity';
import { Repository } from 'typeorm';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Flavor } from './entities/flavor.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { GetPositionFilterDTO } from './dto/get-position-filter.dto';
import User from 'src/users/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository:Repository<Task>,
    @InjectRepository(Flavor)
    private flavorRepository:Repository<Flavor>,
  ) {}

  // TaskService search 

  async getAll(): Promise<Task[]> {
    const Positions = this.tasksRepository.find();
    return Positions;
  }

  async getWithFilters(
    positionFilterDto: GetPositionFilterDTO,
  ): Promise<Task[]> {
    const { search } = positionFilterDto;
    let Positions = await this.getAll();

    if (search) {
      Positions = (await Positions).filter((Position) => {
        if (
          Position.name.includes(search) 
        ) {
          return true;
        } else {
          return false;
        }
      });
    }

    return Positions; // countries;
  }

  async create(createtaskDto:CreateTaskDto) { 
    const flavors = await Promise.all(
      createtaskDto.flavors.map(name=>this.preloadFlavorByName(name)),
    );

    const task = this.tasksRepository.create({
      ...createtaskDto,
      flavors
    });
     return this.tasksRepository.save(task);
   }
 
   findAll(paginationQueryDto:PaginationQueryDto) {
    const {limit, offset} = paginationQueryDto;
     return this.tasksRepository.find(
      {
        relations:['flavors'],
        skip:offset,
        take:limit,
      });
   }

   findOne(id, user:User) {
     const task =  this.tasksRepository.findOne({where: {id},relations:['flavors']});
     if(!task){
       throw new NotFoundException(`Task with the given #${id} not found`);
     }
     console.log(`Requested Task Profile ID: ${id} (type: ${typeof id}, ${user}) `);

     return task;
   }
 
   async update(id: number, updateTaskDto:UpdateTaskDto) {
    const flavors = 
      updateTaskDto.flavors &&
      (
        await Promise.all(
          updateTaskDto.flavors.map(name=>this.preloadFlavorByName(name)),
        )
      );

     const existingTask= await this.tasksRepository.preload({
       id:+id,
       ...updateTaskDto,
       flavors,
     });
     if(!existingTask){
       throw new NotFoundException(`The Task with the given ${id} not found`);
     }
     return this.tasksRepository.save(existingTask);
   }
 
   async remove(id:string) {
    const task  = await this.tasksRepository.delete(id);
 
     if (task.affected === 0) {
       throw new NotFoundException(`Task with id "${id}" not found`);
     }
   }

   private async preloadFlavorByName(name:string): Promise<Flavor>{
    const existingFlavor = await this.flavorRepository.findOneBy({name});
    if(existingFlavor){
      return existingFlavor;
    }
    return this.flavorRepository.create({name});
   }
}