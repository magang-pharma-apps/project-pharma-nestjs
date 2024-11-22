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

  async create(data: CreateTransactionDetailDto | CreateTransactionDetailDto[]) {
   // Jika data adalah array, buat banyak item
  if (Array.isArray(data)) {
    const transactionDetails = this.transactionDetailRepository.create(data);
    return await this.transactionDetailRepository.save(transactionDetails);
  }
  
  // Jika data adalah objek tunggal, buat satu item
  const transactionDetail = this.transactionDetailRepository.create(data);
  return await this.transactionDetailRepository.save(transactionDetail);
  }

  async findAll() {
    const transactionDetails = await this.transactionDetailRepository.createQueryBuilder('transactionDetail')
      .leftJoinAndSelect('transactionDetail.product', 'product')
      .leftJoinAndSelect('transactionDetail.transaction', 'transaction')
      .select([
        'transactionDetail.id',
        'transactionDetail.quantity',
        'transactionDetail.note',
        'product.id',
        'product.name',
        'product.status',
        'transaction.status'
      ])
      .where('product.status = :status', { status: true })
      .andWhere('transaction.status = :status', { status: true })
      .andWhere('transactionDetail.deletedAt IS NULL')
      .orderBy('transactionDetail.id', 'DESC');

    const data = await transactionDetails.getMany();
    console.log(data);

    return data;
  }

  async findOne(id: number) {
    const transactionDetail = await this.transactionDetailRepository.createQueryBuilder('transactionDetail')
      .leftJoinAndSelect('transactionDetail.product', 'product')
      .leftJoinAndSelect('transactionDetail.transaction', 'transaction')
      .select([
        'transactionDetail.id',
        'transactionDetail.quantity',
        'transactionDetail.note',
        'product.id',
        'product.name',
        'product.status',
        'transaction.status'
      ])
      .where('product.status = :status', { status: true })
      .andWhere('transaction.status = :status', { status: true })
      .andWhere('transactionDetail.deletedAt IS NULL')
      .andWhere('transactionDetail.id = :id', { id })
      .orderBy('transactionDetail.id', 'DESC');

    const data = await transactionDetail.getOne();
    console.log(data);

    return data;
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
