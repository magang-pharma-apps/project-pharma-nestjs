import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerEntity } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customersRepository: Repository<CustomerEntity>,
  ) {}
  
  async create(data: CreateCustomerDto) {
    const customer = this.customersRepository.create(data);

    return await this.customersRepository.save(customer);
  }

  async findAll() {
    const customers = await this.customersRepository.createQueryBuilder('customer')
      .select([
        'customer.id',
        'customer.name',
        'customer.age',
        'customer.address',
      ])
      .where('customer.deletedAt IS NULL')
      .orderBy('customer.id', 'DESC')

    const data = await customers.getMany();
    console.log(data);

    return data;
  }

  async findOne(customers_id: number) {
    const customer = await this.customersRepository.createQueryBuilder('customer')
      .select([
        'customer.id',
        'customer.name',
        'customer.age',
        'customer.address',
      ])
      .where('customer.id = :id', { id: customers_id })
      .andWhere('customer.deletedAt IS NULL')

    const data = await customer.getOne();

    if (!data) {
      throw new NotFoundException('Customer not found');
    }

    console.log(data);

    return data;
  }

  async update(customers_id: number, data: UpdateCustomerDto) {
    const customer = await this.customersRepository.findOne({
      where: {
        id: customers_id,
      },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    Object.assign(customer, data);

    return await this.customersRepository.save(customer);
  }

  async remove(customers_id: number) {
    const customer = await this.customersRepository.findOne({
      withDeleted: true,
      where: {
        id: customers_id,
      },  
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return await this.customersRepository.softRemove(customer);
  }
}
