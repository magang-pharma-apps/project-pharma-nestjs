import { Module } from '@nestjs/common';
import { TransactionDetailsService } from './transaction_details.service';
import { TransactionDetailsController } from './transaction_details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionDetailEntity } from './entities/transaction_detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionDetailEntity])],
  controllers: [TransactionDetailsController],
  providers: [TransactionDetailsService],
})
export class TransactionDetailsModule {}
