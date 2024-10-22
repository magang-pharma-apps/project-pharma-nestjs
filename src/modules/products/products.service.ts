import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    // @Inject(REQUEST) private req: any,
  ) {}

  async create(data: CreateProductDto) {
    const product = this.productRepository.create(data);

    // Unduh gambar dari URL dan simpan ke direktori lokal
    if (data.productImageUrl) {
      const imagePath = await this.downloadImage(data.productImageUrl);
      product.localImagePath = imagePath; // Simpan path lokal gambar
    }

    return await this.productRepository.save(product);
  }

  //Fungsi untuk mengunduh gambar
  private async downloadImage(imageUrl: string): Promise<string> {
    const response = await axios({
      url: imageUrl,
      method: 'GET',
      responseType: 'stream',
    });

    const fileName = `product_${Date.now()}.jpg`; // Nama file unik
    const uploadDir = path.join(process.cwd(), 'public/uploads/image'); // Gunakan path dari root proyek

    // Cek apakah direktori sudah ada, jika tidak buat direktori
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const savePath = path.join(uploadDir, fileName);
    const writer = fs.createWriteStream(savePath);

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', () => resolve(`/uploads/image/${fileName}`)); // Return path relatif
      writer.on('error', reject);
    });
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
      relations: ['category', 'unit', 'productImages'],
      select: {
        id: true,
        name: true,
        purchasePrice: true,
        category: {
          name: true,
          status: true,
        },
        unit: {
          name: true,
          status: true,
        },
        // supplier: {
        //   name: true,
        //   contact: true,
        // },
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
      relations: ['category','unit', 'productImages'],
      select: {
        id: true,
        name: true,
        purchasePrice: true,
        category: {
          name: true,
          status: true,
        },
        unit: {
          name: true,
          status: true,
        },
        // supplier: {
        //   name: true,
        //   contact: true,
        // },
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
