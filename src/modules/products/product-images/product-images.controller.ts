import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductImagesService } from './product-images.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { ResponseFormatter } from 'src/config/response_formatter';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ProductImagesDtoIn } from '../dto/product-images.dto';

@ApiTags('Product Images')
@ApiBearerAuth('accessToken')
@UseGuards(AuthGuard)
@Controller('product/images')
export class ProductImagesController {
  constructor(private readonly productImagesService: ProductImagesService) {}

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        images: {
          type: 'string',
          format: 'binary',
          description: 'Upload images JPEG, JPG, PNG',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('images', {
      storage: diskStorage({
        destination: 'public/uploads/product',
        filename: (req, file, cb) => {
          const randomName = Math.random().toString(36).substring(7);
          const originalName = file.originalname;
          const extension = originalName.substring(
            originalName.lastIndexOf('.'),
          );
          const fileName = randomName + extension;
          cb(null, fileName);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (
          file.mimetype === 'image/jpeg' ||
          file.mimetype === 'image/png' ||
          file.mimetype === 'image/jpg'
        ) {
          cb(null, true);
        } else {
          cb(
            new BadRequestException(
              'File type not supported, File Only Support JPG, JPEG, PNG',
            ),
            false,
          );
        }
      },
      limits: {
        fileSize: 1024 * 1024 * 2, // 2MB
      },
    }),
  )
  @Post(':id/upload') // Perhatikan bahwa Anda perlu menangkap id produk dari parameter rute
  async uploadProductImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded.');
    }

    const imagePath = `/uploads/product/${file.filename}`;

    const dtoIn: ProductImagesDtoIn = {
      product_id: +id,
      image: imagePath,
    };

    const productImage =
      await this.productImagesService.uploadProductImage(dtoIn);

    return new ResponseFormatter(productImage, 'Product Image uploaded');
  }

  @Get(':id')
  async findAllProductImages(@Param('id') id: string) {
    const productImages = await this.productImagesService.findAll(+id);
    return new ResponseFormatter(productImages, 'Product images found');
  }

  @Delete(':id/delete')
  async deleteProductImageById(@Param('product_id') product_id: string) {
    try {
      await this.productImagesService.deleteProductImageById(+product_id);
      return 'Product image deleted';
    } catch (error) {
      console.error(`Error deleting product image: ${error.message}`);
      throw new BadRequestException('Failed to delete product image.');
    }
  }
}
