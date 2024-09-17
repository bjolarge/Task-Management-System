import { Test, TestingModule } from '@nestjs/testing';
import { LaymentController } from './layment.controller';
import { LaymentService } from './layment.service';

describe('LaymentController', () => {
  let controller: LaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LaymentController],
      providers: [LaymentService],
    }).compile();

    controller = module.get<LaymentController>(LaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
