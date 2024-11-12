import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupplierEntity } from './entities/supplier.entity';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(SupplierEntity)
    private readonly supplierRepository: Repository<SupplierEntity>,
  ) {}

  async create(data: CreateSupplierDto) {
    const supplier = this.supplierRepository.create(data);

    return await this.supplierRepository.save(supplier);
  }

  async findAll() {
    const suppliers = await this.supplierRepository.createQueryBuilder('supplier')
      .select([
        'supplier.id',
        'supplier.name',
        'supplier.contactNumber',
        'supplier.email',
        'supplier.address',
      ])
      .where('supplier.deletedAt IS NULL')
      .orderBy('supplier.id', 'DESC')

    const data = await suppliers.getMany();
    console.log(data);

    return data;
  }

  async findOne(supplier_id: number) {
    const supplier = await this.supplierRepository.createQueryBuilder('supplier')
      .select([
        'supplier.id',
        'supplier.name',
        'supplier.contactNumber',
        'supplier.email',
        'supplier.address',
    ])
      .where('supplier.deletedAt IS NULL')
      .andWhere('supplier.id = :supplier_id', { supplier_id })
      .orderBy('supplier.id', 'DESC')

    const data = await supplier.getOne();
    console.log(data);

    return data;
  }

  async update(supplier_id: number, data: UpdateSupplierDto) {
    const supplier = await this.supplierRepository.findOne({
      where: {
        id: supplier_id,
      },
    });

    if (!supplier) {
      throw new NotFoundException('Supplier not found');
    }

    Object.assign(supplier, data);

    return await this.supplierRepository.save(supplier);
  }

  async remove(supplier_id: number) {
    const supplier = await this.supplierRepository.findOne({
      withDeleted: true,
      where: {
        id: supplier_id,
      },
    });

    if (!supplier) {
      throw new NotFoundException('Supplier not found');
    }

    return await this.supplierRepository.softRemove(supplier);
  }
}
