import { Test, TestingModule } from '@nestjs/testing';
import { ProductMixturesService } from './product_mixtures.service';

describe('ProductMixturesService', () => {
  let service: ProductMixturesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductMixturesService],
    }).compile();

    service = module.get<ProductMixturesService>(ProductMixturesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
