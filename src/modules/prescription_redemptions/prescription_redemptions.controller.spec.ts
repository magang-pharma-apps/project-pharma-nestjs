import { Test, TestingModule } from '@nestjs/testing';
import { PrescriptionRedemptionsController } from './prescription_redemptions.controller';
import { PrescriptionRedemptionsService } from './prescription_redemptions.service';

describe('PrescriptionRedemptionsController', () => {
  let controller: PrescriptionRedemptionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrescriptionRedemptionsController],
      providers: [PrescriptionRedemptionsService],
    }).compile();

    controller = module.get<PrescriptionRedemptionsController>(PrescriptionRedemptionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
