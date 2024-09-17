import { Test, TestingModule } from '@nestjs/testing';
import { PlentsController } from './plents.controller';
import { PlentsService } from './plents.service';

describe('PlentsController', () => {
  let controller: PlentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlentsController],
      providers: [PlentsService],
    }).compile();

    controller = module.get<PlentsController>(PlentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
