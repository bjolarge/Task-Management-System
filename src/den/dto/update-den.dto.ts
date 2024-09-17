import { PartialType } from '@nestjs/swagger';
import { CreateDenDto } from './create-den.dto';
import { IsString } from 'class-validator';
import { CreateCommentator } from './create-commentator.dto';


//export class UpdateDenDto extends PartialType(CreateDenDto) {
    export class UpdateDenDto{
   comments:CreateCommentator[];
   public:boolean;
    // @IsString()
    // comments:string;
}
