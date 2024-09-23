import { Module } from '@nestjs/common';
import { ProductMixturesService } from './product_mixtures.service';
import { ProductMixturesController } from './product_mixtures.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductMixtureEntity } from './entities/product_mixture.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductMixtureEntity])],
  controllers: [ProductMixturesController],
  providers: [ProductMixturesService],
})
export class ProductMixturesModule {}
