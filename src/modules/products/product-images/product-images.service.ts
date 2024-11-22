import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductImagesEntity } from '../entities/product-images.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductImagesDtoIn } from '../dto/product-images.dto';
import { unlink } from 'fs';

@Injectable()
export class ProductImagesService {
  constructor(
    @InjectRepository(ProductImagesEntity)
    private readonly productImagesRepository: Repository<ProductImagesEntity>,
  ) {}

  async uploadProductImage(dtoIn: ProductImagesDtoIn) {
    try {
      const newProductImage = this.productImagesRepository.create({
        product_id: dtoIn.product_id,
        image: dtoIn.image,
      });

      return await this.productImagesRepository.save(newProductImage);
    } catch (error) {
      throw new BadRequestException('Failed to upload product image.');
    }
  }

  async findAll(product_id: number) {
    const productImages = await this.productImagesRepository.find({
      where: {
        product_id: product_id,
        product: {
          deletedAt: null,
        },
      },
      relations: ['product', 'product.category'],
    });

    const deleteAt = productImages[0]?.product?.deletedAt;

    if (!productImages || deleteAt !== null) {
      throw new NotFoundException('Product images not found.');
    }

    // Jika tidak ada gambar produk ditemukan, lemparkan exception
    // if (!productImages || productImages.length === 0) {
    //   throw new NotFoundException('Product images not found.');
    // }

    const images = productImages.map((image) => {
      return {
        id: image.id,
        product_id: image.product_id,
        image: image.image,
        product: {
          name: image.product.name,
          status: image.product.status,
          category: {
            name: image.product.category.name,
          },
        },
      };
    });

    return images;
  }

  async deleteProductImageById(productImageId: number): Promise<void> {
    const image = await this.productImagesRepository.findOne({
      where: {
        id: productImageId,
      },
    });

    if (!image) {
      throw new NotFoundException('Product image not found.');
    }

    try {
      if (image.image) {
        await unlink('public' + image.image, (err) => {
          if (err) {
            console.error(
              `Failed to delete image file ${image.image}. Error: ${err.message}`,
            );
            throw new BadRequestException('Failed to delete product image.');
          }
        });
      }
    } catch (error) {
      console.error(
        `Failed to delete image file ${image.image}. Error: ${error.message}`,
      );
      throw new BadRequestException('Failed to delete product image.');
    }

    await this.productImagesRepository.remove(image);
  }
}
