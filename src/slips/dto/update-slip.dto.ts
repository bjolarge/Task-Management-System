import { PartialType } from '@nestjs/swagger';
import { CreateSlipDto } from './create-slip.dto';
import { IsArray } from 'class-validator';
import { CreateTipDto } from './create-tip.dto';

//export class UpdateSlipDto extends PartialType(CreateSlipDto) {}
export class UpdateSlipDto{
   @IsArray()
   slip:CreateTipDto[]; 
}
