import { Test, TestingModule } from '@nestjs/testing';
import { CompoundProductsService } from './compound_products.service';

describe('CompoundProductsService', () => {
  let service: CompoundProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompoundProductsService],
    }).compile();

    service = module.get<CompoundProductsService>(CompoundProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
