import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { InventoryEntity, InventoryType } from './entities/inventory.entity';
import { In, Repository } from 'typeorm';
import { ProductEntity } from '../products/entities/product.entity';

@Injectable()
export class InventoriesService {
  constructor(
    @InjectRepository(InventoryEntity)
    private readonly inventoryRepository: Repository<InventoryEntity>,

    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  // async create(data: CreateInventoryDto) {
  //   const inventory = this.inventoryRepository.create(data);

  //   return await this.inventoryRepository.save(inventory);
  // }

  async create(data: CreateInventoryDto) {
    const { items, inventoryDate, inventoryType, note } = data;

    const inventoryItems: InventoryEntity[] = [];

    for (const inventoryItem of items) {
      // 1. Update atau validasi stok produk
      const product = await this.productRepository.findOne({
        where: { id: inventoryItem.productId },
      });

      if (!product) {
        throw new NotFoundException(`Product with ID ${inventoryItem.productId} not found.`);
      }

      // Update stok berdasarkan tipe inventory
      if (inventoryType === InventoryType.IN) {
        product.stockQuantity += inventoryItem.quantity; // Tambah stok
      } else if (inventoryType === InventoryType.OUT) {
        if (product.stockQuantity < inventoryItem.quantity) {
          throw new BadRequestException(
            `Insufficient stock for product ID ${inventoryItem.productId}.`,
          );
        }
        product.stockQuantity -= inventoryItem.quantity; // Kurangi stok
      }

      // Simpan perubahan stok produk
      await this.productRepository.save(product);

      // 2. Buat entitas inventory baru
      const inventory = new InventoryEntity();
      inventory.productId = inventoryItem.productId;
      inventory.inventoryType = inventoryType;
      inventory.noteItem = inventoryItem.noteItem;
      inventory.note = note;
      inventory.inventoryDate = inventoryDate;

      inventoryItems.push(inventory);
    }

    // 3. Simpan semua entitas inventory
    await this.inventoryRepository.save(inventoryItems);

    return {
      message: 'Inventory successfully created and stock updated',
      inventoryItems,
    };
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
