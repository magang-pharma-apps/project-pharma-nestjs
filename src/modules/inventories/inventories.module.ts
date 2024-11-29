import { Module } from '@nestjs/common';
import { InventoriesService } from './inventories.service';
import { InventoriesController } from './inventories.controller';
import { InventoryEntity } from './entities/inventory.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '../products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InventoryEntity, ProductEntity])],
  controllers: [InventoriesController],
  providers: [InventoriesService],
})
export class InventoriesModule {}
