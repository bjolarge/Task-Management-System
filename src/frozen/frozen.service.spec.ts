import { Test, TestingModule } from '@nestjs/testing';
import { FrozenService } from './frozen.service';

describe('FrozenService', () => {
  let service: FrozenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FrozenService],
    }).compile();

    service = module.get<FrozenService>(FrozenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
