import { Test, TestingModule } from '@nestjs/testing';
import { TransactionDetailsController } from './transaction_details.controller';
import { TransactionDetailsService } from './transaction_details.service';

describe('TransactionDetailsController', () => {
  let controller: TransactionDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionDetailsController],
      providers: [TransactionDetailsService],
    }).compile();

    controller = module.get<TransactionDetailsController>(TransactionDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
