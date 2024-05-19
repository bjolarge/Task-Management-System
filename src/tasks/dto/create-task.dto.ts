import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({description:'this points to the title of the task'})
  @IsNotEmpty()
  title: string;

  @ApiProperty({description:'This describes the task'})
  @IsNotEmpty()
  description: string;
}