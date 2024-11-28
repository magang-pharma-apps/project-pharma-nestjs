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

  //untuk mengunduh gambar
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
    const products = await this.productRepository.createQueryBuilder('product')
    .leftJoinAndSelect('product.category', 'category')
    .leftJoinAndSelect('product.unit', 'unit')
    .select([
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
      'category.id',
      'category.name',
      'category.status',
      'unit.id',
      'unit.name',
      'unit.status',
    ])
    .where('category.status = :status', { status: true })
    .andWhere('unit.status = :status', { status: true })
    .andWhere('product.deletedAt IS NULL')
    .orderBy('product.id', 'DESC')
    .getMany();

    const data = products.map((product) => {
      product.purchasePrice = parseFloat(product.purchasePrice.toString());
      product.sellingPrice = parseFloat(product.sellingPrice.toString());
      return product;
    });

    console.log(data);
  
    return data;
  }

  async findOne(id: number) {
    const product = await this.productRepository.createQueryBuilder('product')
    .leftJoinAndSelect('product.category', 'category')
    .leftJoinAndSelect('product.unit', 'unit')
    .select([
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
      'category.id',
      'category.name',
      'category.status',
      'unit.id',
      'unit.name',
      'unit.status',
    ])
    .where('product.id = :id', { id })
    .andWhere('product.deletedAt IS NULL')
    .andWhere('category.status = :status', { status: true })
    .andWhere('unit.status = :status', { status: true })
    .orderBy('product.id', 'DESC')
    .getOne();
    
    if (product) {
      product.purchasePrice = parseFloat(product.purchasePrice.toString());
      product.sellingPrice = parseFloat(product.sellingPrice.toString());
    }
    console.log(product);
    
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

    // Cek jika productImageUrl berubah
  if (data.productImageUrl && data.productImageUrl !== product.productImageUrl) {
    // Hapus gambar lokal lama jika ada
    if (product.localImagePath) {
      const oldImagePath = path.join(process.cwd(), 'public', product.localImagePath);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    // Unduh gambar baru
    const newImagePath = await this.downloadImage(data.productImageUrl);
    product.localImagePath = newImagePath;
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

    // const productAll = await this.productRepository.find({
    //   where: { 
    //     unitId: product.unitId,
    //   }
    // });

    // if (productAll.length > 0) {

    //   await this.productRepository.softRemove(productAll); 
    // }

    const deletedProduct = await this.productRepository.softRemove(product);

    return deletedProduct;
  }

  async reduceStock(productId: number, quantity: number) {
    const product = await this.productRepository.findOne({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.stockQuantity - quantity < 0) {
      throw new BadRequestException('Insufficient stock quantity');
    }

    product.stockQuantity -= quantity;
    await this.productRepository.save(product);

  }
}
