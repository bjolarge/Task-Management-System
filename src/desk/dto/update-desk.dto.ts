import { PartialType } from '@nestjs/swagger';
import { CreateDeskDto } from './create-desk.dto';
import { CreateCommentersDto } from './create-commenters.dto';
import { IsObject, IsString } from 'class-validator';

//export class UpdateDeskDto extends PartialType(CreateDeskDto) {}
export class UpdateDeskDto{
    comments:CreateCommentersDto[];
}
