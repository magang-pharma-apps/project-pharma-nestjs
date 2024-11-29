import { Test, TestingModule } from '@nestjs/testing';
import { CardStockEntriesService } from './card_stock_entries.service';

describe('CardStockEntriesService', () => {
  let service: CardStockEntriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CardStockEntriesService],
    }).compile();

    service = module.get<CardStockEntriesService>(CardStockEntriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
