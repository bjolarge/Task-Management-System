import { Test, TestingModule } from '@nestjs/testing';
import { CloudinaryImagesController } from './cloudinary-images.controller';
import { CloudinaryImagesService } from './cloudinary-images.service';

describe('CloudinaryImagesController', () => {
  let controller: CloudinaryImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CloudinaryImagesController],
      providers: [CloudinaryImagesService],
    }).compile();

    controller = module.get<CloudinaryImagesController>(CloudinaryImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
