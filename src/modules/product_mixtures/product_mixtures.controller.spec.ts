import { Test, TestingModule } from '@nestjs/testing';
import { ProductMixturesController } from './product_mixtures.controller';
import { ProductMixturesService } from './product_mixtures.service';

describe('ProductMixturesController', () => {
  let controller: ProductMixturesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductMixturesController],
      providers: [ProductMixturesService],
    }).compile();

    controller = module.get<ProductMixturesController>(ProductMixturesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
