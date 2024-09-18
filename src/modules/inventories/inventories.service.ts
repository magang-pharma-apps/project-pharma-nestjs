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
    const inventories = await this.inventoryRepository.find({
      where: {
        deletedAt: null,
        warehouse: {
          status: true,
        },
      },
      order: {
        id: 'DESC',
      },
      relations: ['product', 'supplier', 'warehouse'],
      select: {
        id: true,
        quantity: true,
        location: true,
        note: true,
        product: {
          name: true,
          purchasePrice: true,
        },
        supplier: {
          name: true,
          contact: true,
        },
        warehouse: {
          name: true,
          status: true,
        },
      },
    });

    if (!inventories) {
      throw new NotFoundException('Inventories not found');
    }

    return inventories;
  }

  async findOne(id: number) {
    const inventory = await this.inventoryRepository.findOne({
      where: {
        id: id,
        deletedAt: null,
        warehouse: {
          status: true,
      },
    },
    order: {
      id: 'DESC',
    },
    relations: ['product', 'supplier', 'warehouse'],
    select: {
      id: true,
      quantity: true,
      location: true,
      note: true,
      product: {
        name: true,
        purchasePrice: true,
      },
      supplier: {
        name: true,
        contact: true,
      },
      warehouse: {
        name: true,
        status: true,
      },
    },
  });

    if (!inventory) {
      throw new NotFoundException('Inventory not found');
    }

    return inventory;
  }
    
  async update(id: number, data: UpdateInventoryDto) {
    const inventory = await this.inventoryRepository.findOne({
      where: {
        id: id,
        deletedAt: null,
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
