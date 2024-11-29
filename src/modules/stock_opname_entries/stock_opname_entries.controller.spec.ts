import { Test, TestingModule } from '@nestjs/testing';
import { StockOpnameEntriesController } from './stock_opname_entries.controller';
import { StockOpnameEntriesService } from './stock_opname_entries.service';

describe('StockOpnameEntriesController', () => {
  let controller: StockOpnameEntriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockOpnameEntriesController],
      providers: [StockOpnameEntriesService],
    }).compile();

    controller = module.get<StockOpnameEntriesController>(StockOpnameEntriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
