import { Module } from '@nestjs/common';
import { PrescriptionRedemptionsService } from './prescription_redemptions.service';
import { PrescriptionRedemptionsController } from './prescription_redemptions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrescriptionRedemptionEntity } from './entities/prescription_redemption.entity';
import { PrescriptionEntity } from '../prescriptions/entities/prescription.entity';
import { TransactionEntity } from '../transactions/entities/transaction.entity';
import { TransactionsModule } from '../transactions/transactions.module';
import { ProductEntity } from '../products/entities/product.entity';
import { TransactionsService } from '../transactions/transactions.service';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([PrescriptionRedemptionEntity, PrescriptionEntity, TransactionEntity, ProductEntity]), ProductsModule, TransactionsModule],
  controllers: [PrescriptionRedemptionsController],
  providers: [PrescriptionRedemptionsService, TransactionsService],
})
export class PrescriptionRedemptionsModule {}
