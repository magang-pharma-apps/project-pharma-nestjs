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
    const warehouses = await this.warehouseRepository.find({
      where: {
        deletedAt: null,
        supplier: {
          status: true
        },
      },
      order: {
        id: 'DESC',
      },
      relations: ['supplier'],
      select: {
        id: true,
        name: true,
        location: true,
        supplier: {
          name: true,
          contactNumber: true,
          email: true,
          address: true,
          status: true,
        },
      },
    });

    if (!warehouses) {
      throw new NotFoundException('Warehouses not found');
    }

    return warehouses;
  }

  async findOne(id: number) {
    const warehouse = await this.warehouseRepository.findOne({
      where: {
        id: id,
        deletedAt: null,
        supplier: {
          status: true
        },
      },
      order: {
        id: 'DESC',
      },
      relations: ['supplier'],
      select: {
        id: true,
        name: true,
        location: true,
        supplier: {
          name: true,
          contactNumber: true,
          email: true,
          address: true,
          status: true,
        },
      },
    });

    if (!warehouse) {
      throw new NotFoundException('Warehouse not found');
    }

    return warehouse;
  }

  async update(id: number, data: UpdateWarehouseDto) {
    const warehouse = await this.warehouseRepository.findOne({
      where: {
        id: id,
        deletedAt: null,
      },
    });

    if (!warehouse) {
      throw new NotFoundException('Warehouse not found');
    }

    Object.assign(warehouse, data);

    const updatedWarehouse = await this.warehouseRepository.save(warehouse);

    return updatedWarehouse;
  }

  async remove(id: number) {
    const warehouse = await this.warehouseRepository.findOne({
      withDeleted: true,
      where: {
        id: id,
      },
    });

    if (!warehouse) {
      throw new NotFoundException('Warehouse not found');
    }

    const deletedWarehouse = await this.warehouseRepository.softRemove(warehouse);

    return deletedWarehouse;
  }
}
