import { Test, TestingModule } from '@nestjs/testing';
import { DenController } from './den.controller';
import { DenService } from './den.service';

describe('DenController', () => {
  let controller: DenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DenController],
      providers: [DenService],
    }).compile();

    controller = module.get<DenController>(DenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
