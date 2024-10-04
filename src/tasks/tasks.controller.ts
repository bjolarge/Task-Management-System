import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetUser } from '../authentication/decorators/get-user.decorator'
import { ApiTags } from '@nestjs/swagger';
import User from 'src/users/entities/user.entity';
import JwtAuthenticationGuard from 'src/authentication/guards/jwt-authentication.guard';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { GetPositionFilterDTO } from './dto/get-position-filter.dto';
import { Task } from './entities/task.entity';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  //filter method
  @Get('app')
  async getPositions(
    @Query() positionFilterDto: GetPositionFilterDTO,
  ): Promise<Task[]> {
    if (Object.keys(positionFilterDto).length) {
      return this.tasksService.getWithFilters(positionFilterDto);
    } else {
      return this.tasksService.getAll();
    }
  }

  @Post()
 // @UseGuards(JwtAuthenticationGuard)
  create(@Body() createTaskDto: CreateTaskDto,
  //@GetUser(){name}:User
) {
 // console.log(`Hello ${name}`);
    return this.tasksService.create(createTaskDto);
  }

  @Get()
 // @UseGuards(JwtAuthenticationGuard)
  //findAll(@GetUser(){name}:User)
  findAll(@Query()paginationQueryDto:PaginationQueryDto) {
    return this.tasksService.findAll(paginationQueryDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthenticationGuard)
  findOne(@Param('id') id: string, @GetUser()user:User) {
   // console.log(user);
   console.log(`Logged User ID: ${user.id}, Requested Company Profile ID: ${id}`);
    return this.tasksService.findOne(+id, user);

    // return this.tasksService.findOne(+id, user);
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
