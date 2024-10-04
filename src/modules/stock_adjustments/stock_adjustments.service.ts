import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStockAdjustmentDto } from './dto/create-stock_adjustment.dto';
import { UpdateStockAdjustmentDto } from './dto/update-stock_adjustment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StockAdjustmentEntity } from './entities/stock_adjustment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StockAdjustmentsService {
  constructor(
    @InjectRepository(StockAdjustmentEntity)
    private readonly stockAdjustmentRepository: Repository<StockAdjustmentEntity>,
  ) {}
  async create(data: CreateStockAdjustmentDto) {
    const stockAdjustment = this.stockAdjustmentRepository.create(data);

    return await this.stockAdjustmentRepository.save(stockAdjustment);
  }

  async findAll() {
    const stockAdjustments = await this.stockAdjustmentRepository.find({
      where: {
        deletedAt: null,
      },
      order: {
        id: 'DESC',
      },
      relations: ['product'],
      select: {
        id: true,
        quantity_adjusted: true,
        product: {
          name: true,
          purchasePrice: true,
        },
      },
    });

    if (!stockAdjustments) {
      throw new NotFoundException('StockAdjustment not found');
    }
    return stockAdjustments;
  }

  async findOne(id: number) {
    const stockAdjustment = await this.stockAdjustmentRepository.findOne({
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
        quantity_adjusted: true,
        product: {
          name: true,
          purchasePrice: true,
        },
      },
    });

    if (!stockAdjustment) {
      throw new NotFoundException('StockAdjustment not found');
    }
    return stockAdjustment;
  }

  async update(id: number, data: UpdateStockAdjustmentDto) {
    const stockAdjustment = await this.stockAdjustmentRepository.findOne({
      where: {
        id: id,
        deletedAt: null,
      },
    });

    if (!stockAdjustment) {
      throw new NotFoundException('StockAdjustment not found');
    }

    Object.assign(stockAdjustment, data);
    const updatedStockAdjustment = await this.stockAdjustmentRepository.save(
      stockAdjustment
    );
    return updatedStockAdjustment;
  }

  async remove(id: number) {
    const stockAdjustment = await this.stockAdjustmentRepository.findOne({
      withDeleted: true,
      where: {
        id: id,
      },
    });

    if (!stockAdjustment) {
      throw new NotFoundException('StockAdjustment not found');
    } 
    const deletedStockAdjustment = this.stockAdjustmentRepository.softRemove(stockAdjustment);
    return deletedStockAdjustment;
  }
}
