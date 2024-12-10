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
    const compoundProducts = await this.compoundProductRepository.createQueryBuilder('compound_product')
      .leftJoinAndSelect('compound_product.product', 'product')
      .select([
        'compound_product.id',
        // 'compound_product.productId',
        'compound_product.userId',
        'compound_product.compoundName',
        'compound_product.formulaDescription',
        'compound_product.compoundPrice',
        'compound_product.quantity',
        'compound_product.expiryDate',
        'product.id',
        'product.productCode',
        'product.name',
        'product.description',
        'product.purchasePrice',
        'product.sellingPrice',
        'product.expiryDate',
        'product.stockQuantity',
        'product.productImageUrl',
        'product.drugClass',
      ])
      .where('compound_product.deletedAt IS NULL')
      .orderBy('compound_product.id', 'DESC')
      .getMany();

    const data = compoundProducts.map((compoundProduct) => {
      if (compoundProduct.product) {
        compoundProduct.product.purchasePrice = parseFloat(compoundProduct.product.purchasePrice.toString());
        compoundProduct.product.sellingPrice = parseFloat(compoundProduct.product.sellingPrice.toString());
      }
      return compoundProduct;
    });

    console.log(data);

    return data;
  }

  async findOne(id: number) {
    const compoundProduct = await this.compoundProductRepository.createQueryBuilder('compound_product')
      .leftJoinAndSelect('compound_product.product', 'product')
      .select([
        'compound_product.id',
        // 'compound_product.productId',
        'compound_product.userId',
        'compound_product.compoundName',
        'compound_product.formulaDescription',
        'compound_product.compoundPrice',
        'compound_product.quantity',
        'compound_product.expiryDate',
        'product.id',
        'product.productCode',
        'product.name',
        'product.description',
        'product.purchasePrice',
        'product.sellingPrice',
        'product.expiryDate',
        'product.stockQuantity',
        'product.productImageUrl',
        'product.drugClass',
      ])
      .where('compound_product.deletedAt IS NULL')
      .andWhere('compound_product.id = :id', { id })
      .getOne();

      if (compoundProduct && compoundProduct.product) {
        compoundProduct.product.purchasePrice = parseFloat(compoundProduct.product.purchasePrice.toString());
        compoundProduct.product.sellingPrice = parseFloat(compoundProduct.product.sellingPrice.toString());
      }

      if (!compoundProduct) {
        throw new NotFoundException('Compound product not found');
      }
  
      console.log(compoundProduct);
  
      return compoundProduct;
  }

  async update(id: number, data: UpdateCompoundProductDto) {
    const compoundProduct = await this.compoundProductRepository.findOne({
      where: {
        id: id,
        deletedAt: Not(null),
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
