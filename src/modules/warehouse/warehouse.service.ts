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
    const warehouses = await this.warehouseRepository.createQueryBuilder('warehouse')
      .leftJoinAndSelect('warehouse.supplier', 'supplier')
      .select([
        'warehouse.id',
        'warehouse.name',
        'warehouse.location',
        'warehouse.supplierId',
        'supplier.name',
        'supplier.contactNumber',
        'supplier.email',
        'supplier.address',
      ])
      .orderBy('warehouse.id', 'DESC')

    const data = await warehouses.getMany();
    console.log(data);

    return data;
  }

  async findOne(id: number) {
    const warehouse = await this.warehouseRepository.createQueryBuilder('warehouse')
      .leftJoinAndSelect('warehouse.supplier', 'supplier')
      .select([
        'warehouse.id',
        'warehouse.name',
        'warehouse.location',
        'warehouse.supplierId',
        'supplier.name',
        'supplier.contactNumber',
        'supplier.email',
        'supplier.address',
      ])
      .where('warehouse.id = :id', { id })
      .orderBy('warehouse.id', 'DESC')

    const data = await warehouse.getOne();
    console.log(data);

    return data;
  }

  async update(id: number, data: UpdateWarehouseDto) {
    const warehouse = await this.warehouseRepository.findOne({
      where: {
        id: id,
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
      where: {
        id: id,
      },
    });

    if (!warehouse) {
      throw new NotFoundException('Warehouse not found');
    }

    await this.warehouseRepository.remove(warehouse);

    return warehouse;
  }
}
