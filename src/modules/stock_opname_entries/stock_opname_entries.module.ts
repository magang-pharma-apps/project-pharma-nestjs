import { Module } from '@nestjs/common';
import { StockOpnameEntriesService } from './stock_opname_entries.service';
import { StockOpnameEntriesController } from './stock_opname_entries.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockOpnameEntryEntity } from './entities/stock_opname_entry.entity';
import { ProductEntity } from '../products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StockOpnameEntryEntity, ProductEntity])],
  controllers: [StockOpnameEntriesController],
  providers: [StockOpnameEntriesService],
})
export class StockOpnameEntriesModule {}
