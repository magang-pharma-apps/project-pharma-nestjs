import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { ProductImagesEntity } from './entities/product-images.entity';
import { ProductImagesService } from './product-images/product-images.service';
import { ProductImagesController } from './product-images/product-images.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, ProductImagesEntity])],
  controllers: [ProductsController, ProductImagesController],
  providers: [ProductsService, ProductImagesService],
  exports: [ProductsService, ProductImagesService, TypeOrmModule],
})
export class ProductsModule {}