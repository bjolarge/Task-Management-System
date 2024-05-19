import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetUser } from '../authentication/decorators/get-user.decorator'
import { ApiTags } from '@nestjs/swagger';
import User from 'src/users/entities/user.entity';
import JwtAuthenticationGuard from 'src/authentication/guards/jwt-authentication.guard';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  create(@Body() createTaskDto: CreateTaskDto,
  @GetUser(){name}:User
) {
  console.log(`Hello ${name}`);
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @UseGuards(JwtAuthenticationGuard)
  findAll(@GetUser(){name}:User) {
    return this.tasksService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthenticationGuard)
  findOne(@Param('id') id: string, @GetUser(){name}:User) {
    return this.tasksService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthenticationGuard)
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto,
   @GetUser(){name}:User) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthenticationGuard)
  remove(@Param('id') id:string,
  @GetUser(){name}:User) {
    return this.tasksService.remove(id);
  }
}
