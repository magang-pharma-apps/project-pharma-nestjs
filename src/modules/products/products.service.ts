import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import axios from 'axios';

import { join } from 'path';
import { existsSync, mkdirSync, writeFile } from 'fs';
import { promisify } from 'util';
import { extname } from 'path';


@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    
    // @Inject(REQUEST) private req: any,
  ) {
     // Buat direktori untuk menyimpan gambar jika belum ada
     const uploadPath = join(__dirname, '..', '..', 'uploads/images');
     if (!existsSync(uploadPath)) {
       mkdirSync(uploadPath, { recursive: true });
     }
  }

  async create(productDto: CreateProductDto, file: Express.Multer.File) {
    // Simpan file gambar di server
    if (file) {
      const fileExtension = extname(file.originalname);
      const fileName = `${Date.now()}${fileExtension}`; // Menggunakan timestamp untuk nama file unik
      const uploadPath = join(__dirname, '..', '..', 'uploads/images', fileName);
      
      // Simpan file ke disk
      await fs.promises.writeFile(uploadPath, file.buffer);
      
      // Update localImagePath di DTO
      productDto.localImagePath = `uploads/images/${fileName}`;
    }

    // Simpan produk ke dalam database
    const newProduct = this.productRepository.create(productDto);
    await this.productRepository.save(newProduct);
    
    console.log('Product data saved:', productDto);
    return newProduct; // Kembalikan produk yang ditambahkan
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
      relations: ['category', 'unit'],
      select: {
        id: true,
        productCode: true,
        name: true,
        description: true,
        purchasePrice: true,
        sellingPrice: true,
        expiryDate: true,
        stockQuantity: true,
        localImagePath: true,
        drugClass: true,
        category: {
          name: true,
          status: true,
        },
        unit: {
          name: true,
          status: true,
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
        category : {
          status: true,
        },
      },
      order: {
        id: 'DESC',
      },
      relations: ['category','unit'],
      select: {
        id: true,
        productCode: true,
        name: true,
        description: true,
        purchasePrice: true,
        sellingPrice: true,
        expiryDate: true,
        stockQuantity: true,
        localImagePath: true,
        drugClass: true,
        category: {
          name: true,
          status: true,
        },
        unit: {
          name: true,
          status: true,
        },
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async update(id: number, data: UpdateProductDto, newImagePath?: string) {
    const product = await this.productRepository.findOne({
      where: {
        id: id,
        deletedAt: null,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // Perbarui data
    Object.assign(product, data);

    if (newImagePath) {
      product.localImagePath = newImagePath;
    }

    // const updatedProduct = await this.productRepository.save(product);

    return await this.productRepository.save(product);
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

    // Hapus file gambar dari server
    if (product.localImagePath) {
      fs.unlink(`public${product.localImagePath}`, (err) => {
        if (err) console.error(`Failed to delete image file: ${err.message}`);
      });
    }

    // const deletedProduct = await this.productRepository.softRemove(product);

    return await this.productRepository.softRemove(product);
  }
}
