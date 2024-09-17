import { Test, TestingModule } from '@nestjs/testing';
import { DenService } from './den.service';

describe('DenService', () => {
  let service: DenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DenService],
    }).compile();

    service = module.get<DenService>(DenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
