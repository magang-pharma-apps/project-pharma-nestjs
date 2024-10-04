import { Module } from '@nestjs/common';
import { StockAdjustmentsService } from './stock_adjustments.service';
import { StockAdjustmentsController } from './stock_adjustments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockAdjustmentEntity } from './entities/stock_adjustment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StockAdjustmentEntity])],
  controllers: [StockAdjustmentsController],
  providers: [StockAdjustmentsService],
})
export class StockAdjustmentsModule {}
