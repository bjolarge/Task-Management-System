import { PartialType } from '@nestjs/swagger';
import { CreateFrozenDto } from './create-frozen.dto';

export class UpdateFrozenDto extends PartialType(CreateFrozenDto) {}
