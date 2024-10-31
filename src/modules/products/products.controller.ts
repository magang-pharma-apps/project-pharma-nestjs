import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  NotFoundException,
  BadRequestException,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { ResponseFormatter } from 'src/config/response_formatter';
import { ProductDtoOut } from './dto/product.dto';
import { Permission } from 'src/decorators/requires-permission.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@ApiTags('Product')
@ApiBearerAuth('accessToken')
@UseGuards(AuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // @ApiConsumes('multipart/form-data')
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       images: {
  //         type: 'string',
  //         format: 'binary',
  //         description: 'Upload images JPEG, JPG, PNG',
  //       },
  //     },
  //   },
  // })

  // @UseInterceptors(
  //   FileInterceptor('images', {
  //     storage: diskStorage({
  //       destination: './public/uploads/product',
  //       filename: (req, file, cb) => {
  //         const randomName = Math.random().toString(36).substring(7);
  //         const extension = file.originalname.substring(
  //           file.originalname.lastIndexOf('.'),
  //         );
  //         const fileName = randomName + extension;
  //         cb(
  //           null,
  //           fileName,
  //         );
  //       },
  //     }),
  //     fileFilter: (req, file, cb) => {
  //       if (
  //         file.mimetype === 'image/jpeg' ||
  //         file.mimetype === 'image/png' ||
  //         file.mimetype === 'image/jpg'
  //       ) {
  //         cb(null, true);
  //       } else {
  //         cb(
  //           new BadRequestException(
  //             'File type not supported, File Only Support JPG, JPEG, PNG',
  //           ),
  //           false,
  //         );
  //       }
  //     },
  //     limits: {
  //       fileSize: 1024 * 1024 * 2, // 2MB
  //     },
  //   })
  // )
  
  // @Post()
  // @UseInterceptors(FileInterceptor('file'))
  // async create(
  //   @Body() createProductDto: CreateProductDto,
  //   @UploadedFile() file: Express.Multer.File,
  // ) {

  //   if (!file) {
  //     throw new BadRequestException('No file uploaded');
  //   }

  //   createProductDto.localImagePath = `/uploads/product/${file.filename}`;

  //   const product = await this.productsService.create(createProductDto);

  //   return new ResponseFormatter(product, 'Product created');
  // }

 
  @Post()
  @UseInterceptors(FileInterceptor('file')) // Menangani file upload
  @ApiResponse({ status: 201, description: 'Product created successfully.' })
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File // Mengambil file yang diupload
  ) {
    return this.productsService.create(createProductDto, file);
  }


  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Products data',
    type: ProductDtoOut,
  })

  @Permission('read:product')
  @Get()
  async findAll() {
    const products = await this.productsService.findAll();

    if (!products) {
      return new NotFoundException('Products not found');
    }

    return new ResponseFormatter(products, 'Products found');
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Product data',
    type: ProductDtoOut,
  })
  
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productsService.findOne(+id);

    if (!product) {
      return new NotFoundException('Product not found');
    }

    return new ResponseFormatter(product, 'Product found');
  }

  @Patch(':id')
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
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {

    if (!file) {
      updateProductDto.localImagePath = `/uploads/product/${file.filename}`;
    }

    const product = await this.productsService.update(+id, updateProductDto);

    if (!product) {
      return new NotFoundException('Product not found');
    }

    return new ResponseFormatter(product, 'Product updated');
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const product = await this.productsService.remove(+id);

    if (!product) {
      return new NotFoundException('Product not found');
    }

    return new ResponseFormatter(product, 'Product deleted');
  }
}
