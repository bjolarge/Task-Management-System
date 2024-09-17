import { PartialType } from '@nestjs/swagger';
import { CreateCloudinaryImageDto } from './create-cloudinary-image.dto';

export class UpdateCloudinaryImageDto extends PartialType(CreateCloudinaryImageDto) {}
