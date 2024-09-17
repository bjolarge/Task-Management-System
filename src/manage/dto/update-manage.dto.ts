import { PartialType } from '@nestjs/swagger';
import { CreateCommentDto } from './create-comment.dto';

//export class UpdateManageDto extends PartialType(CreateManageDto) {}
export class UpdateManageDto{
    comments:CreateCommentDto[];
}
