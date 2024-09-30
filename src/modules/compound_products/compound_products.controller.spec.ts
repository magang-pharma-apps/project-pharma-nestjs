import { Test, TestingModule } from '@nestjs/testing';
import { CompoundProductsController } from './compound_products.controller';
import { CompoundProductsService } from './compound_products.service';

describe('CompoundProductsController', () => {
  let controller: CompoundProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompoundProductsController],
      providers: [CompoundProductsService],
    }).compile();

    controller = module.get<CompoundProductsController>(CompoundProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
