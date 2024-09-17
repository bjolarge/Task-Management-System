import { PartialType } from '@nestjs/swagger';
import { CreateLaymentDto } from './create-layment.dto';

export class UpdateLaymentDto extends PartialType(CreateLaymentDto) {}
