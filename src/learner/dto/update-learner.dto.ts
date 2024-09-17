import { PartialType } from '@nestjs/swagger';
import { CreateLearnerDto } from './create-learner.dto';
import { CreateLeptDto } from './create-lept.dto';
import { IsArray } from 'class-validator';

//export class UpdateLearnerDto extends PartialType(CreateLearnerDto) {}
export class UpdateLearnerDto{
    @IsArray()
    learnersclub:CreateLeptDto[]; 
}
