import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStockOpnameEntryDto } from './dto/create-stock_opname_entry.dto';
import { UpdateStockOpnameEntryDto } from './dto/update-stock_opname_entry.dto';
import { Repository } from 'typeorm';
import { StockOpnameEntryEntity } from './entities/stock_opname_entry.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StockOpnameEntriesService {
  constructor(
    @InjectRepository(StockOpnameEntryEntity)
    private readonly stockOpnameEntriesService: Repository<StockOpnameEntryEntity>,
  ) {}
  
  async create(data: CreateStockOpnameEntryDto) {
    const stockOpnameEntry = this.stockOpnameEntriesService.create(data);

    return await this.stockOpnameEntriesService.save(stockOpnameEntry);
  }

  async findAll() {
    const stockOpnameEntries = await this.stockOpnameEntriesService.createQueryBuilder('stockOpnameEntry')
    .leftJoinAndSelect('stockOpnameEntry.product', 'product')
    .select([
      'stockOpnameEntry.id',
      'stockOpnameEntry.recordedStock',
      'stockOpnameEntry.physicalStock',
      'stockOpnameEntry.opnameDate',
      'stockOpnameEntry.discrepancy',
      'product.name',
    ])
    .where('stockOpnameEntry.deletedAt IS NULL')
    .orderBy('stockOpnameEntry.id', 'DESC')

    const data = await stockOpnameEntries.getMany();
    console.log(data);

    return data;
  }

  async findOne(id: number) {
    const stockOpnameEntry = await this.stockOpnameEntriesService.createQueryBuilder('stockOpnameEntry')
    .leftJoinAndSelect('stockOpnameEntry.product', 'product')
    .select([
      'stockOpnameEntry.id',
      'stockOpnameEntry.recordedStock',
      'stockOpnameEntry.physicalStock',
      'stockOpnameEntry.opnameDate',
      'stockOpnameEntry.discrepancy',
      'product.name',
    ])
    .where('stockOpnameEntry.deletedAt IS NULL')
    .andWhere('stockOpnameEntry.id = :id', { id: id })
    .orderBy('stockOpnameEntry.id', 'DESC')

    const data = await stockOpnameEntry.getOne();
    console.log(data);

    return data;
  }

  async update(id: number, data: UpdateStockOpnameEntryDto) {
    const stockOpnameEntry = await this.stockOpnameEntriesService.findOne({
      where: {
        id: id,
        deletedAt: null,
      },
    });

    if (!stockOpnameEntry) {
      throw new NotFoundException('StockOpnameEntry not found');
    }

    Object.assign(stockOpnameEntry, data);

    const updatedStockOpnameEntry = this.stockOpnameEntriesService.save(stockOpnameEntry);

    return updatedStockOpnameEntry;
  }

  async remove(id: number) {
    const stockOpnameEntry = await this.stockOpnameEntriesService.findOne({
      withDeleted: true,
      where: {
        id: id,
      },
    });
    
    if (!stockOpnameEntry) {
      throw new NotFoundException('StockOpnameEntry not found');
    }

    const deletedStockOpnameEntry = this.stockOpnameEntriesService.softRemove(stockOpnameEntry);

    return deletedStockOpnameEntry;
  }
}
