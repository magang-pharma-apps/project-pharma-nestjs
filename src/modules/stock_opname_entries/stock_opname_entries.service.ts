import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStockOpnameEntryDto } from './dto/create-stock_opname_entry.dto';
import { UpdateStockOpnameEntryDto } from './dto/update-stock_opname_entry.dto';
import { Repository } from 'typeorm';
import { StockOpnameEntryEntity } from './entities/stock_opname_entry.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../products/entities/product.entity';

@Injectable()
export class StockOpnameEntriesService {
  constructor(
    @InjectRepository(StockOpnameEntryEntity)
    private readonly stockOpnameEntriesRepository: Repository<StockOpnameEntryEntity>,

    @InjectRepository(ProductEntity)
    private readonly productsRepository: Repository<ProductEntity>,
  ) {}
  
  async create(data: CreateStockOpnameEntryDto) {
    const { items, opnameDate, note } = data;

    const opnameItems: StockOpnameEntryEntity[] = [];

    for (const item of items) {
      // validasi produk
      const product = await this.productsRepository.findOne({
        where: { id: item.productId },
      });

      if (!product) {
        throw new NotFoundException(`Product with ID ${item.productId} not found.`);
      }

      product.stockQuantity = item.physicalStock;
      await this.productsRepository.save(product);

      const stockOpnameEntry = this.stockOpnameEntriesRepository.create({
        productId: item.productId,
        physicalStock: item.physicalStock,
        discrepancy: item.discrepancy,
        opnameDate,
        note,
      });
  
      // Tambahkan ke daftar untuk disimpan
      opnameItems.push(stockOpnameEntry);
    }
  
    // Simpan semua Stock Opname Entries sekaligus
    const savedStockOpnameEntries = await this.stockOpnameEntriesRepository.save(opnameItems);
  
    return savedStockOpnameEntries;
  }

  async findAll() {
    const queryOpnameEntries = await this.stockOpnameEntriesRepository.createQueryBuilder('stockOpnameEntry')
    .leftJoinAndSelect('stockOpnameEntry.product', 'product')
    .select([
      'stockOpnameEntry.id',
      'stockOpnameEntry.physicalStock',
      'stockOpnameEntry.discrepancy',
      'stockOpnameEntry.opnameDate',
      'stockOpnameEntry.note',
      'product.id',
      'product.name',
    ])
    .where('stockOpnameEntry.deletedAt IS NULL')
    .andWhere('product.status = :status', { status: true })
    .orderBy('stockOpnameEntry.id', 'DESC')

    const opname = await queryOpnameEntries.getMany();

    const data = opname.map((stockOpnameEntry) => ({
      id: stockOpnameEntry.id,
      items: [
        {
          productId: stockOpnameEntry.product.id,
          productName: stockOpnameEntry.product.name,
          physicalStock: stockOpnameEntry.physicalStock,
          discrepancy: stockOpnameEntry.discrepancy,
        }
      ],
      opnameDate: stockOpnameEntry.opnameDate,
      note: stockOpnameEntry.note,
    }));

    console.log(data);

    return data;
  }

  async findOne(id: number) {
    const stockOpnameEntry = await this.stockOpnameEntriesRepository.createQueryBuilder('stockOpnameEntry')
    .leftJoinAndSelect('stockOpnameEntry.product', 'product')
    .select([
      'stockOpnameEntry.id',
      'stockOpnameEntry.physicalStock',
      'stockOpnameEntry.discrepancy',
      'stockOpnameEntry.opnameDate',
      'stockOpnameEntry.note',
      'product.id',
      'product.name',
    ])
    .where('stockOpnameEntry.id = :id', { id: id })
    .andWhere('stockOpnameEntry.deletedAt IS NULL')
    .andWhere('product.status = :status', { status: true })
    .getOne();

    if (!stockOpnameEntry) {
      throw new NotFoundException('StockOpnameEntry not found');
    }

    const data = {
      id: stockOpnameEntry.id,
      items: [
        {
          productId: stockOpnameEntry.product.id,
          productName: stockOpnameEntry.product.name,
          physicalStock: stockOpnameEntry.physicalStock,
          discrepancy: stockOpnameEntry.discrepancy,
        }
      ],
      opnameDate: stockOpnameEntry.opnameDate,
      note: stockOpnameEntry.note,
    };

    console.log(data);

    return data;
  }

  async update(id: number, data: UpdateStockOpnameEntryDto) {
    const stockOpnameEntry = await this.stockOpnameEntriesRepository.findOne({
      where: {
        id: id,
        deletedAt: null,
      },
    });

    if (!stockOpnameEntry) {
      throw new NotFoundException('StockOpnameEntry not found');
    }

    Object.assign(stockOpnameEntry, data);

    const updatedStockOpnameEntry = this.stockOpnameEntriesRepository.save(stockOpnameEntry);

    return updatedStockOpnameEntry;
  }

  async remove(id: number) {
    const stockOpnameEntry = await this.stockOpnameEntriesRepository.findOne({
      withDeleted: true,
      where: {
        id: id,
      },
    });
    
    if (!stockOpnameEntry) {
      throw new NotFoundException('StockOpnameEntry not found');
    }

    const deletedStockOpnameEntry = await this.stockOpnameEntriesRepository.softRemove(stockOpnameEntry);

    return deletedStockOpnameEntry;
  }
}
