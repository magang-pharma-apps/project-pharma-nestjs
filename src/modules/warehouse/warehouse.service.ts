import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WarehouseEntity } from './entities/warehouse.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WarehouseService {
  constructor(
    @InjectRepository(WarehouseEntity)
    private readonly warehouseRepository: Repository<WarehouseEntity>,
  ) {}
  
  async create(data: CreateWarehouseDto) {
    const warehouse = this.warehouseRepository.create(data);

    return await this.warehouseRepository.save(warehouse);
  }

  async findAll() {
    const warehouses = this.warehouseRepository.find({
      order: {
        id: 'DESC',
      },
    });

    return warehouses;
  }

  async findOne(warehouse_id: number) {
    const warehouse = await this.warehouseRepository.findOne({
      where: {
        id: warehouse_id,
      },
    });

    if (!warehouse) {
      throw new NotFoundException('Warehouse not found');
    }

    return warehouse;
  }

  async update(warehouse_id: number, data: UpdateWarehouseDto) {
    const warehouse = await this.warehouseRepository.findOne({
      where: {
        id: warehouse_id,
      },
    });

    if (!warehouse) {
      throw new NotFoundException('Warehouse not found');
    }

    Object.assign(warehouse, data);

    return await this.warehouseRepository.save(warehouse);
  }

  async remove(warehouse_id: number) {
    const warehouse = await this.warehouseRepository.findOne({
      withDeleted: true,
      where: {
        id: warehouse_id,
      },
    });

    if (!warehouse) {
      throw new NotFoundException('Warehouse not found');
    }

    return await this.warehouseRepository.softRemove(warehouse);
  }
}
