import { PartialType } from '@nestjs/swagger';
import { CreateItemDto } from './create-item.dto';
import { CreateCommentDto } from './create-comment.dto';
import { IsArray, IsBoolean } from 'class-validator';

//export class UpdateItemDto extends PartialType(CreateItemDto) {}
export class UpdateItemDto{
    @IsBoolean()
    public:boolean;

    @IsArray()
    comments:CreateCommentDto[];
}
