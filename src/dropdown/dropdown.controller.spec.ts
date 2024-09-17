import { Test, TestingModule } from '@nestjs/testing';
import { DropdownController } from './dropdown.controller';
import { DropdownService } from './dropdown.service';

describe('DropdownController', () => {
  let controller: DropdownController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DropdownController],
      providers: [DropdownService],
    }).compile();

    controller = module.get<DropdownController>(DropdownController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
