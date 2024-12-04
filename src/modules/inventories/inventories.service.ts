import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { InventoryEntity, InventoryType, ReasonType } from './entities/inventory.entity';
import { Repository } from 'typeorm';
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
    const { items, inventoryDate, inventoryType, note, reasonType } = data;

    if (!reasonType) {
      throw new BadRequestException('Reason is required for inventory');
    }
    
    const inventoryItems: InventoryEntity[] = [];

    for (const inventoryItem of items) {
      // validasi produk
      const product = await this.productRepository.findOne({
        where: { id: inventoryItem.productId },
      });

      if (!product) {
        throw new NotFoundException(`Product with ID ${inventoryItem.productId} not found.`);
      }

      // Update stok berdasarkan tipe inventory
      if (inventoryType === InventoryType.IN) {
        product.stockQuantity += inventoryItem.qtyItem; // Tambah stok
      } else if (inventoryType === InventoryType.OUT) {
        if (product.stockQuantity < inventoryItem.qtyItem) {
          throw new BadRequestException(
            `Insufficient stock for product ID ${inventoryItem.productId}.`,
          );
        }
        product.stockQuantity -= inventoryItem.qtyItem; // Kurangi stok
      }

      // Simpan perubahan stok produk
      await this.productRepository.save(product);

      // Buat entitas inventory baru
      const inventory = new InventoryEntity();
      inventory.productId = inventoryItem.productId;
      inventory.inventoryType = inventoryType;
      inventory.reasonType = reasonType;
      inventory.noteItem = inventoryItem.noteItem;
      inventory.note = note;
      inventory.qtyItem = inventoryItem.qtyItem;
      inventory.inventoryDate = inventoryDate;

      inventoryItems.push(inventory);
    }

    // Simpan semua entitas inventory
    await this.inventoryRepository.save(inventoryItems);

    return {
      message: 'Inventory successfully created and stock updated',
      inventoryItems,
    };
  }

  async findAll(inventoryType?: InventoryType, reasonType?: ReasonType) {
    const query = await this.inventoryRepository.createQueryBuilder('inventory')
      .leftJoinAndSelect('inventory.product', 'product')
      // .leftJoinAndSelect('inventory.warehouse', 'warehouse')
      .select([
        'inventory.id',
        'inventory.inventoryType',
        // 'inventory.reasonType',
        'inventory.inventoryDate',
        'inventory.note',
        'inventory.noteItem',
        'inventory.qtyItem',
        'product.id',
        'product.name',
        'product.stockQuantity',
        'product.status',
        // 'warehouse.id',
        // 'warehouse.name',
        // 'warehouse.status',
      ])
      .where('product.status = :status', { status: true })
      .andWhere('inventory.deletedAt IS NULL')
      // .andWhere('inventory.inventoryType = :inventoryType', { inventoryType: 'Out' })
      .orderBy('inventory.id', 'DESC');

    if (inventoryType) {
      query.andWhere('inventory.inventoryType = :inventoryType', { inventoryType });

      // if (reasonType) {
      //   query.andWhere('inventory.reasonType = :reasonType', { reasonType });
      // }
      // Filter reasonType berdasarkan inventoryType
    if (inventoryType === InventoryType.IN && reasonType) {
      query.andWhere('inventory.reasonType IN (:...reasonType)', { reasonType: ['Purchase', 'Replacement', 'Bonus'] });
    }

    if (inventoryType === InventoryType.OUT && reasonType) {
      query.andWhere('inventory.reasonType IN (:...reasonType)', { reasonType: ['Expired', 'Damage', 'Lost'] });
    }
    }

    const inventories = await query.getMany();

    const data = inventories.map((inventory) => ({
      id: inventory.id,
      inventoryType: inventory.inventoryType,
      reasonType: inventory.reasonType,
      inventoryDate: inventory.inventoryDate,
      note: inventory.note,
      items: [
        {
          product: {
            id: inventory.product.id,
            name: inventory.product.name,
            stockQuantity: inventory.product.stockQuantity,
          },
          noteItem: inventory.noteItem,
          qtyItem: inventory.qtyItem,
        },
      ],
    }));

    console.log(data);

    return data;

    // const data = await inventories.getMany();
    // console.log(data);

    // return data;
  }

  async findOne(id: number) {
    const inventory = await this.inventoryRepository.createQueryBuilder('inventory')
      .leftJoinAndSelect('inventory.product', 'product')
      // .leftJoinAndSelect('inventory.warehouse', 'warehouse')
      .select([
        'inventory.id',
        'inventory.inventoryType',
        'inventory.inventoryDate',
        'inventory.note',
        'inventory.noteItem',
        'inventory.qtyItem',
        'product.id',
        'product.name',
        'product.stockQuantity',
        'product.status',
        // 'warehouse.id',
        // 'warehouse.name',
        // 'warehouse.status',
      ])
      .where('product.status = :status', { status: true })
      .andWhere('inventory.deletedAt IS NULL')
      // .andWhere('warehouse.status = :status', { status: true })
      .andWhere('inventory.id = :id', { id })
      .getOne();

    if (!inventory) {
      throw new NotFoundException('Inventory not found');
    }

    const data = {
      id: inventory.id,
      inventoryType: inventory.inventoryType,
      inventoryDate: inventory.inventoryDate,
      note: inventory.note,
      items: [
        {
          product: {
            id: inventory.product.id,
            name: inventory.product.name,
            stockQuantity: inventory.product.stockQuantity,
          },
          noteItem: inventory.noteItem,
          qtyItem: inventory.qtyItem,
        },
      ],
    };

    console.log(data);

    return data;

    // const data = await inventory.getOne();
    // console.log(data);

    // return data;
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
