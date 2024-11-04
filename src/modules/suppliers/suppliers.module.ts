import { Module } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { SuppliersController } from './suppliers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierEntity } from './entities/supplier.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SupplierEntity])],
  controllers: [SuppliersController],
  providers: [SuppliersService],
})
export class SuppliersModule {}