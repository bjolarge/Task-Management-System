import { Module } from '@nestjs/common';
import { CloudinaryImagesService } from './cloudinary-images.service';
import { CloudinaryImagesController } from './cloudinary-images.controller';
import { CloudinaryProvider } from './cloudinary-images-provider';
import { MulterModule } from '@nestjs/platform-express';
import multer from 'multer';

@Module({
  //controllers: [CloudinaryImagesController],
  imports:[
    MulterModule.register({
      storage: multer.memoryStorage(), // or configure a storage engine
    }),
  ],
  providers: [CloudinaryImagesService, CloudinaryProvider],
  exports:[CloudinaryImagesService, CloudinaryProvider],
})
export class CloudinaryImagesModule {}
