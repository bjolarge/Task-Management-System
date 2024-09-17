import { Test, TestingModule } from '@nestjs/testing';
import { CloudinaryImagesService } from './cloudinary-images.service';

describe('CloudinaryImagesService', () => {
  let service: CloudinaryImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CloudinaryImagesService],
    }).compile();

    service = module.get<CloudinaryImagesService>(CloudinaryImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
