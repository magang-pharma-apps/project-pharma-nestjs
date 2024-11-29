import { Module } from '@nestjs/common';
import { PrescriptionRedemptionsService } from './prescription_redemptions.service';
import { PrescriptionRedemptionsController } from './prescription_redemptions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrescriptionRedemptionEntity } from './entities/prescription_redemption.entity';
import { PrescriptionEntity } from '../prescriptions/entities/prescription.entity';
import { TransactionEntity } from '../transactions/entities/transaction.entity';
import { TransactionsModule } from '../transactions/transactions.module';

@Module({
  imports: [TypeOrmModule.forFeature([PrescriptionRedemptionEntity, PrescriptionEntity, TransactionEntity]), TransactionsModule],
  controllers: [PrescriptionRedemptionsController],
  providers: [PrescriptionRedemptionsService],
})
export class PrescriptionRedemptionsModule {}
