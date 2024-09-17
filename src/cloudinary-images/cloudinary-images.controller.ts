// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { CloudinaryImagesService } from './cloudinary-images.service';
// import { CreateCloudinaryImageDto } from './dto/create-cloudinary-image.dto';
// import { UpdateCloudinaryImageDto } from './dto/update-cloudinary-image.dto';

// @Controller('cloudinary-images')
// export class CloudinaryImagesController {
//   constructor(private readonly cloudinaryImagesService: CloudinaryImagesService) {}
// }


// app.controller.ts
import { Controller, Post, UseInterceptors, UploadedFile, BadRequestException, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileSizeValidationPipe } from './file-size-validation.pipe';
import cloudinary from './cloudinary-image-config';

@Controller('cloudinary-images')
export class CloudinaryImagesController{
  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile(new FileSizeValidationPipe()) file: Express.Multer.File) {
    try {
      const result = await cloudinary.uploader.upload_stream(
        { resource_type: 'image' },
        (error, result) => {
          if (error) {
            throw new BadRequestException('Error uploading image');
          }
          return result;
        }
      );
      file.stream.pipe(result);
      return result;
    } catch (error) {
      throw new BadRequestException('Error uploading file');
    }
  }

  @Get('leg')
  async getOrange(){
    return 'Fried Rice and Beans'
  }
}
