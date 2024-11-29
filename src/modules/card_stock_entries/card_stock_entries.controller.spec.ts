import { Test, TestingModule } from '@nestjs/testing';
import { CardStockEntriesController } from './card_stock_entries.controller';
import { CardStockEntriesService } from './card_stock_entries.service';

describe('CardStockEntriesController', () => {
  let controller: CardStockEntriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardStockEntriesController],
      providers: [CardStockEntriesService],
    }).compile();

    controller = module.get<CardStockEntriesController>(CardStockEntriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
