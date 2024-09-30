import { Module } from '@nestjs/common';
import { CompoundProductsService } from './compound_products.service';
import { CompoundProductsController } from './compound_products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompoundProductEntity } from './entities/compound_product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CompoundProductEntity])],
  controllers: [CompoundProductsController],
  providers: [CompoundProductsService],
})
export class CompoundProductsModule {}
