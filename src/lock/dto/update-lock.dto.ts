import { PartialType } from '@nestjs/swagger';
import { CreateLockDto } from './create-lock.dto';
import { IsArray } from 'class-validator';
import { LommentDto } from './lomment.dto';

//export class UpdateLockDto extends PartialType(CreateLockDto) {}
export class UpdateLockDto {
    @IsArray()
    lomment:LommentDto[];
}
