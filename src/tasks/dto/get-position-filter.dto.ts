import { IsString } from 'class-validator';

export class GetPositionFilterDTO {
  @IsString()
  search?: string;
}
