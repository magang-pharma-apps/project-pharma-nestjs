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
    const customers = await this.customersRepository.find({
      order: {
        id: 'DESC',
      },
    });

    return customers;
  }

  async findOne(customer_id: number) {
    const customer = await this.customersRepository.findOne({
      where: {
        id: customer_id,
      },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return customer;
  }

  async update(customer_id: number, data: UpdateCustomerDto) {
    const customer = await this.customersRepository.findOne({
      where: {
        id: customer_id,
      },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    Object.assign(customer, data);

    return await this.customersRepository.save(customer);
  }

  async remove(customer_id: number) {
    const customer = await this.customersRepository.findOne({
      withDeleted: true,
      where: {
        id: customer_id,
      },  
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return await this.customersRepository.remove(customer);
  }
}
