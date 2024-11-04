import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDetailDto } from './dto/create-transaction_detail.dto';
import { UpdateTransactionDetailDto } from './dto/update-transaction_detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionDetailEntity } from './entities/transaction_detail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionDetailsService {
  constructor(
    @InjectRepository(TransactionDetailEntity)
    private readonly transactionDetailRepository: Repository<TransactionDetailEntity>
  ) {}

  async create(data: CreateTransactionDetailDto) {
    const transactionDetail = this.transactionDetailRepository.create(data);
    
    return await this.transactionDetailRepository.save(transactionDetail);
  }

  async findAll() {
    const transactionDetails = await this.transactionDetailRepository.find({
      where: {
        deletedAt: null,
        transaction: {
          status: true
        },
      },
      order: {
        id: 'DESC'
      },
      relations: ['product', 'transaction'],
      select: {
        id: true,
        quantity: true,
        note: true,
        product: {
          name: true,
          status: true
        },
        transaction: {
          status: true
        },
      },
    });

    if (!transactionDetails) {
      throw new NotFoundException('TransactionDetails not found');
    }

    return transactionDetails;
  }

  async findOne(id: number) {
    const transactionDetail = await this.transactionDetailRepository.findOne({
      where: {
        deletedAt: null,
        transaction: {
          status: true
        },
      },
      order: {
        id: 'DESC'
      },
      relations: ['product', 'transaction'],
      select: {
        id: true,
        quantity: true,
        note: true,
        product: {
          name: true,
          status: true
        },
        transaction: {
          status: true
        },
      },
    });

    if (!transactionDetail) {
      throw new NotFoundException('TransactionDetail not found');
    }

    return transactionDetail;
  }

  async update(id: number, data: UpdateTransactionDetailDto) {
    const transactionDetail = await this.transactionDetailRepository.findOne({
      where: {
        id: id,
        deletedAt: null
      },
    });

    if (!transactionDetail) {
      throw new NotFoundException('TransactionDetail not found');
    }
    
    Object.assign(transactionDetail, data);

    const updatedTransactionDetail = await this.transactionDetailRepository.save(transactionDetail);

    return updatedTransactionDetail;
  }

  async remove(id: number) {
    const transactionDetail = await this.transactionDetailRepository.findOne({
      withDeleted: true,
      where: {
        id: id
      },
    });

    if (!transactionDetail) {
      throw new NotFoundException('TransactionDetail not found');
    }

    const deletedTransactionDetail = await this.transactionDetailRepository.softRemove(transactionDetail);

    return deletedTransactionDetail;
  }
}
