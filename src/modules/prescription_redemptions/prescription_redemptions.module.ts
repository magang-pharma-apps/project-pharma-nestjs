import { Module } from '@nestjs/common';
import { PrescriptionRedemptionsService } from './prescription_redemptions.service';
import { PrescriptionRedemptionsController } from './prescription_redemptions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrescriptionRedemptionEntity } from './entities/prescription_redemption.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PrescriptionRedemptionEntity])],
  controllers: [PrescriptionRedemptionsController],
  providers: [PrescriptionRedemptionsService],
})
export class PrescriptionRedemptionsModule {}
