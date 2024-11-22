import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { InventoryEntity } from './entities/inventory.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InventoriesService {
  constructor(
    @InjectRepository(InventoryEntity)
    private readonly inventoryRepository: Repository<InventoryEntity>,
  ) {}

  async create(data: CreateInventoryDto) {
    const inventory = this.inventoryRepository.create(data);

    return await this.inventoryRepository.save(inventory);
  }

  async findAll() {
    const inventories = await this.inventoryRepository.createQueryBuilder('inventory')
      .leftJoinAndSelect('inventory.product', 'product')
      // .leftJoinAndSelect('inventory.warehouse', 'warehouse')
      .select([
        'inventory.id',
        // 'inventory.quantityInStock',
        'inventory.note',
        'product.id',
        'product.name',
        'product.status',
        // 'warehouse.id',
        // 'warehouse.name',
        // 'warehouse.status',
      ])
      .where('product.status = :status', { status: true })
      .andWhere('inventory.deletedAt IS NULL')
      // .andWhere('warehouse.status = :status', { status: true })
      .orderBy('inventory.id', 'DESC')

    const data = await inventories.getMany();
    console.log(data);

    return data;
  }

  async findOne(id: number) {
    const inventory = await this.inventoryRepository.createQueryBuilder('inventory')
      .leftJoinAndSelect('inventory.product', 'product')
      // .leftJoinAndSelect('inventory.warehouse', 'warehouse')
      .select([
        'inventory.id',
        // 'inventory.quantityInStock',
        'inventory.note',
        'product.id',
        'product.name',
        'product.status',
        // 'warehouse.id',
        // 'warehouse.name',
        // 'warehouse.status',
      ])
      .where('product.status = :status', { status: true })
      .andWhere('inventory.deletedAt IS NULL')
      // .andWhere('warehouse.status = :status', { status: true })
      .andWhere('inventory.id = :id', { id })
      .orderBy('inventory.id', 'DESC')

    const data = await inventory.getOne();
    console.log(data);

    return data;
  }
    
  async update(id: number, data: UpdateInventoryDto) {
    const inventory = await this.inventoryRepository.findOne({
      where: {
        id: id,
        deletedAt: null
      },
    });

    if (!inventory) {
      throw new NotFoundException('Inventory not found');
    }

    Object.assign(inventory, data);

    const updatedInventory = this.inventoryRepository.save(inventory);

    return updatedInventory;
  }

  async remove(id: number) {
    const inventory = await this.inventoryRepository.findOne({
      withDeleted: true,
      where: {
        id: id,
      },
    });

    if (!inventory) {
      throw new NotFoundException('Inventory not found');
    }

    const deletedInventory = await this.inventoryRepository.softRemove(inventory);

    return deletedInventory;
  }
}
