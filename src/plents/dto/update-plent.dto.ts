import { PartialType } from '@nestjs/swagger';
import { CreatePlentDto } from './create-plent.dto';

export class UpdatePlentDto extends PartialType(CreatePlentDto) {}
