import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductMixtureDto } from './dto/create-product_mixture.dto';
import { UpdateProductMixtureDto } from './dto/update-product_mixture.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductMixtureEntity } from './entities/product_mixture.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductMixturesService {
  constructor(
    @InjectRepository(ProductMixtureEntity)
    private readonly productMixtureRepository: Repository<ProductMixtureEntity>,
  ) {}

  async create(data: CreateProductMixtureDto) {
    const product_mixture = this.productMixtureRepository.create(data);

    return await this.productMixtureRepository.save(product_mixture);
  }

  async findAll() {
    const product_mixtures = await this.productMixtureRepository.find({
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
        },
      }
    });

    if (!product_mixtures) {
      throw new NotFoundException('Product mixtures not found');
    }

    return product_mixtures;
  }

  async findOne(id: number) {
    const product_mixture = await this.productMixtureRepository.findOne({
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
      },
    });

    if (!product_mixture) {
      throw new NotFoundException('Product mixture not found');
    }

    return product_mixture;

  }

  async update(id: number, data: UpdateProductMixtureDto) {
    const product_mixture = await this.productMixtureRepository.findOne({
      where: {
        id: id,
        deletedAt: null,
      },
    });

    if (!product_mixture) {
      throw new NotFoundException('Product mixture not found');
    }

    Object.assign(product_mixture, data);
    const updatedProductMixture = await this.productMixtureRepository.save(
      product_mixture
    );

    return updatedProductMixture;

  }

  async remove(id: number) {
    const product_mixture = await this.productMixtureRepository.findOne({
      withDeleted: true,
      where: {
        id: id,
      },
    });

    if (!product_mixture) {
      throw new NotFoundException('Product mixture not found');
    }

    const deletedProductMixture = await this.productMixtureRepository.softRemove(
      product_mixture
    );

    return deletedProductMixture;

  }
}
