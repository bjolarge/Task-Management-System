import { Test, TestingModule } from '@nestjs/testing';
import { PlentsService } from './plents.service';

describe('PlentsService', () => {
  let service: PlentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlentsService],
    }).compile();

    service = module.get<PlentsService>(PlentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
