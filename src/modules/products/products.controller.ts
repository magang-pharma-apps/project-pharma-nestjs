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
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { ResponseFormatter } from 'src/config/response_formatter';
import { ProductDtoOut } from './dto/product.dto';
import { Permission } from 'src/decorators/requires-permission.decorator';
import axios from 'axios';
import { join } from 'path';
import { writeFile } from 'fs/promises';

@ApiTags('Product')
@ApiBearerAuth('accessToken')
@UseGuards(AuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.productsService.create(createProductDto);

    return new ResponseFormatter(product, 'Product created');
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
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
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
