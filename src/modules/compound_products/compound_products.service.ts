import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompoundProductDto } from './dto/create-compound_product.dto';
import { UpdateCompoundProductDto } from './dto/update-compound_product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CompoundProductEntity } from './entities/compound_product.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class CompoundProductsService {
  constructor(
    @InjectRepository(CompoundProductEntity)
    private readonly compoundProductRepository: Repository<CompoundProductEntity>,
  ) {}

  async create(data: CreateCompoundProductDto) {
    const compoundProduct = this.compoundProductRepository.create(data);

    return await this.compoundProductRepository.save(compoundProduct);
  }

  async findAll() {
    const compoundProducts = await this.compoundProductRepository.find({
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
          purchasePrice: true,
        }
      }
    });

    if (!compoundProducts) {
      throw new NotFoundException('Compound products not found');
    }
    return compoundProducts;
  }

  async findOne(id: number) {
    const compoundProduct = await this.compoundProductRepository.findOne({
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
          purchasePrice: true,
        },
      }
    });

    if (!compoundProduct) {
      throw new NotFoundException('Compound product not found');
    }

    return compoundProduct;
  }

  async update(id: number, data: UpdateCompoundProductDto) {
    const compoundProduct = await this.compoundProductRepository.findOne({
      where: {
        id: id,
        deletedAt: null,
      },
    });

    if (!compoundProduct) {
      throw new NotFoundException('Compound product not found');
    }

    Object.assign(compoundProduct, data);

    const updatedCompoundProduct = await this.compoundProductRepository.save(
      compoundProduct
    );

    return updatedCompoundProduct;
  }

  async remove(id: number) {
    const compoundProduct = await this.compoundProductRepository.findOne({
      withDeleted: true,
      where: {
        id: id,
      },
    });
      
    if (!compoundProduct) {
      throw new NotFoundException('Compound product not found');
    }

    const deletedCompoundProduct = await this.compoundProductRepository.softRemove(
      compoundProduct
    );

    return deletedCompoundProduct;
    
  }
}
