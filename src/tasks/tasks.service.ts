import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../tasks/entities/task.entity';
import { Repository } from 'typeorm';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository:Repository<Task>,
  ) {}

  async create(createtaskDto:CreateTaskDto) { 
    const task = await this.tasksRepository.create(createtaskDto)
     return this.tasksRepository.save(task);
   }
 
   findAll() {
     return this.tasksRepository.find();
   }

   findOne(id) {
     const task =  this.tasksRepository.findOne({where: {id}});
     if(!task){
       throw new NotFoundException(`Task with the given #${id} not found`);
     }
     return task;
   }
 
   async update(id: number, updateTaskDto:UpdateTaskDto) {
     const existingTask= await this.tasksRepository.preload({
       id:+id,
       ...updateTaskDto,
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
}