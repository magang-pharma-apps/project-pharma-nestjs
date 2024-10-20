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
    const stockOpnameEntries = await this.stockOpnameEntriesService.find({
      where: {
        deletedAt: null,
      },
      order: {
        id: 'DESC',
      },
      relations: ['product'],
      select: {
        id: true,
        recordedStock: true,
        physicalStock: true,
        opnameDate: true,
        discrepancy: true,
        // product: {
        //   name: true,
        // },
      },
    });

    if (!stockOpnameEntries) {
      throw new NotFoundException('StockOpnameEntries not found');
    }

    return stockOpnameEntries;
  }

  async findOne(id: number) {
    const stockOpnameEntry = await this.stockOpnameEntriesService.findOne({
      where: {
        id: id,
        deletedAt: null,
      },
      order: {
        id: 'DESC',
      },
      relations: ['product'],
      select: {
        id: true,
        recordedStock: true,
        physicalStock: true,
        opnameDate: true,
        discrepancy: true,
        // product: {
        //   name: true,
        // },
      },
    });

      if (!stockOpnameEntry) {
        throw new NotFoundException('StockOpnameEntry not found');
      }

      return stockOpnameEntry;

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
