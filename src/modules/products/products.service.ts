import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    // @Inject(REQUEST) private req: any,
  ) {}

  async create(data: CreateProductDto) {
    const product = this.productRepository.create(data);

    return await this.productRepository.save(product);
  }

  async findAll() {
    const products = await this.productRepository.find({
      where: {
        deletedAt: null,
        category: {
          status: true,
        },
      },
      order: {
        id: 'DESC',
      },
      relations: ['category', 'supplier', 'productImages'],
      select: {
        id: true,
        name: true,
        price: true,
        category: {
          name: true,
          status: true,
        },
        supplier: {
          name: true,
          contact: true,
        },
        productImages: {
          image: true,
        },
      },
    });

    if (!products) {
      throw new NotFoundException('Products not found');
    }

    return products;
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: {
        id: id,
        deletedAt: null,
        category: {
          status: true,
        },
      },
      order: {
        id: 'DESC',
      },
      relations: ['category', 'supplier','productImages'],
      select: {
        id: true,
        name: true,
        price: true,
        category: {
          name: true,
          status: true,
        },
        supplier: {
          name: true,
          contact: true,
        },
        productImages: {
          image: true,
        },
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async update(id: number, data: UpdateProductDto) {
    const product = await this.productRepository.findOne({
      where: {
        id: id,
        deletedAt: null,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    Object.assign(product, data);

    const updatedProduct = await this.productRepository.save(product);

    return updatedProduct;
  }

  async remove(id: number) {
    const product = await this.productRepository.findOne({
      withDeleted: true,
      where: {
        id: id,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const deletedProduct = await this.productRepository.softRemove(product);

    return deletedProduct;
  }
}
