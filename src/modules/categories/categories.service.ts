import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,

    // @Inject(REQUEST) private req: any,
  ) {}

  async create(data: CreateCategoryDto) {
    const category = this.categoryRepository.create(data);

    return await this.categoryRepository.save(category);
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
      where: {
        id: categories_id,
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
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
