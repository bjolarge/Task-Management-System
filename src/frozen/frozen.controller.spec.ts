import { Test, TestingModule } from '@nestjs/testing';
import { FrozenController } from './frozen.controller';
import { FrozenService } from './frozen.service';

describe('FrozenController', () => {
  let controller: FrozenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FrozenController],
      providers: [FrozenService],
    }).compile();

    controller = module.get<FrozenController>(FrozenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
