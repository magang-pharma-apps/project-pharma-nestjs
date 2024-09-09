import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionEntity } from './entities/transaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
  ) {}

  async create(data: CreateTransactionDto) {
    const transaction = this.transactionRepository.create(data);

    return await this.transactionRepository.save(transaction);
  }

  async findAll() {
    const transactions = await this.transactionRepository.find({
      where: {
        deletedAt: null,
      },
      order: {
        id: 'DESC',
      },
      relations: ['product'],
      select: {
        id: true,
        quantity: true,
        product: {
          name: true,
          price: true,
        },
      },
    });

    if (!transactions) {
      throw new NotFoundException('Transactions not found');
    }

    return transactions;
  }

  async findOne(id: number) {
    const transaction = await this.transactionRepository.findOne({
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
        quantity: true,

        product: {
          name: true,
          price: true,
        },
      },
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    return transaction;
  }

  async update(id: number, data: UpdateTransactionDto) {
    const transaction = await this.transactionRepository.findOne({
      where: {
        id: id,
        deletedAt: null,
      },
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    Object.assign(transaction, data);
    const updatedTransaction = this.transactionRepository.save(transaction);

    return updatedTransaction;
  }

  async remove(id: number) {
    const transaction = await this.transactionRepository.findOne({
      withDeleted: true,
      where: {
        id: id,
      },
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    const deletedTransaction = await this.transactionRepository.softRemove(transaction);

    return deletedTransaction;
  
  }
}
