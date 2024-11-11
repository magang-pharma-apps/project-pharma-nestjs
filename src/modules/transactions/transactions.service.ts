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
    const transaction = this.transactionRepository.create({
      ...data,
      items: data.items.map(item => ({
        ...item,
        transaction: undefined,
      }))
    });

    return await this.transactionRepository.save(transaction);
  }

  async findAll() {
    const transactions = await this.transactionRepository.createQueryBuilder('transaction')
      .leftJoinAndSelect('transaction.items', 'items')
      .leftJoinAndSelect('items.product', 'product')
      .select([
        'transaction.id',
        'transaction.userId',
        'transaction.transactionDate',
        'transaction.transactionType',
        'transaction.categoryType',
        'transaction.note',
        'transaction.tax',
        'transaction.subTotal',
        'transaction.grandTotal',
        'transaction.paymentMethod',
        'items.id',
        'items.productId',
        'items.quantity',
        'items.note',
        'product.productCode',
        'product.name',
        'product.productImageUrl',
      ])
      .where('transaction.deletedAt IS NULL')
      .orderBy('transaction.id', 'DESC')


    const data = await transactions.getMany();
    console.log(data);

    return data;
  }

  async findOne(transaction_id: number) {
    const transaction = await this.transactionRepository.createQueryBuilder('transaction')
      .leftJoinAndSelect('transaction.items', 'items')
      .leftJoinAndSelect('items.product', 'product')
      .select([
        'transaction.id',
        'transaction.userId',
        'transaction.transactionDate',
        'transaction.transactionType',
        'transaction.categoryType',
        'transaction.note',
        'transaction.tax',
        'transaction.subTotal',
        'transaction.grandTotal',
        'transaction.paymentMethod',
        'items.id',
        'items.productId',
        'items.quantity',
        'items.note',
        'product.productCode',
        'product.name',
        'product.productImageUrl',
      ])
      .where('transaction.id = :id', { id: transaction_id })
      .andWhere('transaction.deletedAt IS NULL')
      .orderBy('transaction.id', 'DESC')

    const data = await transaction.getOne();
    console.log(data);

    return data;
  }

  async update(transaction_id: number, data: UpdateTransactionDto) {
    const transaction = await this.transactionRepository.findOne({
      where: {
        id: transaction_id,
      },
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    Object.assign(transaction, data);

    return await this.transactionRepository.save(transaction);
  }

  async remove(transaction_id: number) {
    const transaction = await this.transactionRepository.findOne({
      withDeleted: true,
      where: {
        id: transaction_id,
      },
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    return await this.transactionRepository.softRemove(transaction);
  
  }
}
