import { Test, TestingModule } from '@nestjs/testing';
import { LaymentService } from './layment.service';

describe('LaymentService', () => {
  let service: LaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LaymentService],
    }).compile();

    service = module.get<LaymentService>(LaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
