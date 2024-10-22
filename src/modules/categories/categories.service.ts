import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from './entities/category.entity';
import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,

    // @Inject(REQUEST) private req: any,
  ) {}

  async create(data: CreateCategoryDto) {
    const category = this.categoryRepository.create(data);

    // Unduh gambar dari URL dan simpan ke direktori lokal
    if (data.categoryImageUrl) {
      const imagePath = await this.downloadImage(data.categoryImageUrl);
      category.localImagePath = imagePath; // Simpan path lokal gambar
    }

    return await this.categoryRepository.save(category);
  }

  //Fungsi untuk mengunduh gambar
  private async downloadImage(imageUrl: string): Promise<string> {
    const response = await axios({
      url: imageUrl,
      method: 'GET',
      responseType: 'stream',
    });
  
    const fileName = `category_${Date.now()}.jpg`; // Nama file unik
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
    const categories = await this.categoryRepository.find({
      order: {
        id: 'DESC',
      },
    });

    return categories;
  }

  async findOne(categories_id: number) {
    const category = await this.categoryRepository.findOne({
      where: {
        id: categories_id,
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async update(categories_id: number, data: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOne({
      where: { id: categories_id },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    if (data.categoryImageUrl && data.categoryImageUrl !== category.categoryImageUrl) {
      const imagePath = await this.downloadImage(data.categoryImageUrl);
      category.localImagePath = imagePath; // Update path lokal jika URL berubah
    }

    Object.assign(category, data);
    return await this.categoryRepository.save(category);
  }

  async remove(categories_id: number) {
    const category = await this.categoryRepository.findOne({
      withDeleted: true,
      where: {
        id: categories_id,
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return await this.categoryRepository.softRemove(category);
  }
}
