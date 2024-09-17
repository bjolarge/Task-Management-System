// file-size-validation.pipe.ts
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  readonly maxSize = 2 * 1024 * 1024; // 2MB

  transform(file: Express.Multer.File) {
    if (file.size > this.maxSize) {
      throw new BadRequestException('File size should not exceed 2MB');
    }
    return file;
  }
}
