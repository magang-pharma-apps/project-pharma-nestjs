import { Test, TestingModule } from '@nestjs/testing';
import { StockOpnameEntriesService } from './stock_opname_entries.service';

describe('StockOpnameEntriesService', () => {
  let service: StockOpnameEntriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockOpnameEntriesService],
    }).compile();

    service = module.get<StockOpnameEntriesService>(StockOpnameEntriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
