import { Test, TestingModule } from '@nestjs/testing';
import { PrescriptionRedemptionsService } from './prescription_redemptions.service';

describe('PrescriptionRedemptionsService', () => {
  let service: PrescriptionRedemptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrescriptionRedemptionsService],
    }).compile();

    service = module.get<PrescriptionRedemptionsService>(PrescriptionRedemptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
