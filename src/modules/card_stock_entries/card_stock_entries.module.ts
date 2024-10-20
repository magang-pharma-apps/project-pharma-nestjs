import { Module } from '@nestjs/common';
import { CardStockEntriesService } from './card_stock_entries.service';
import { CardStockEntriesController } from './card_stock_entries.controller';
import { CardStockEntryEntity } from './entities/card_stock_entry.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CardStockEntryEntity])],
  controllers: [CardStockEntriesController],
  providers: [CardStockEntriesService],
})
export class CardStockEntriesModule {}
