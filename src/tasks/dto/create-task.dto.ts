import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  // @ApiProperty({description:'this points to the title of the task'})
  // @IsNotEmpty()
  // title: string;

  // @ApiProperty({description:'This describes the task'})
  // @IsNotEmpty()
  // description: string;

  @ApiProperty({description:'This describes the task name'})
  @IsString()
  @IsNotEmpty()
  name:string;

  @ApiProperty({description:'This describes the task brand'})
  @IsNotEmpty()
  @IsString()
  @IsNotEmpty()
  brand:string;

  @ApiProperty({description:'This describes the flavor'})
  @IsNotEmpty()
  @IsString({each:true})
  flavors: string[];
}