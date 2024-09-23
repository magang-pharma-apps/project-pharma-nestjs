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
  NotFoundException
} from '@nestjs/common';
import { ProductMixturesService } from './product_mixtures.service';
import { CreateProductMixtureDto } from './dto/create-product_mixture.dto';
import { UpdateProductMixtureDto } from './dto/update-product_mixture.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { ResponseFormatter } from 'src/config/response_formatter';
import { ProductMixtureDtoOut } from './dto/product_mixture.dto';

@ApiTags('Product Mixtures')
@ApiBearerAuth('accessToken')
@UseGuards(AuthGuard)
@Controller('product-mixtures')
export class ProductMixturesController {
  constructor(private readonly productMixturesService: ProductMixturesService) {}

  @Post()
  async create(@Body() createProductMixtureDto: CreateProductMixtureDto) {
    const product_mixture = await this.productMixturesService.create(createProductMixtureDto);

    return new ResponseFormatter(product_mixture, 'Product mixture created');
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Product mixture data',
    type: ProductMixtureDtoOut,
  })

  @Get()
  async findAll() {
    const product_mixtures = await this.productMixturesService.findAll();

    if (!product_mixtures) {
      return new NotFoundException('Product mixtures not found');
    }

    return new ResponseFormatter(product_mixtures, 'Product mixtures found');
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Product mixture data',
    type: ProductMixtureDtoOut,
  })

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product_mixture = await this.productMixturesService.findOne(+id);

    if (!product_mixture) {
      return new NotFoundException('Product mixture not found');
    }

    return new ResponseFormatter(product_mixture, 'Product mixture found');
  }

  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateProductMixtureDto: UpdateProductMixtureDto
  ) {
    const product_mixture = await this.productMixturesService.update(+id, updateProductMixtureDto);

    if (!product_mixture) {
      return new NotFoundException('Product mixture not found');
    }

    return new ResponseFormatter(product_mixture, 'Product mixture updated');
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const product_mixture = await this.productMixturesService.remove(+id);

    if (!product_mixture) {
      return new NotFoundException('Product mixture not found');
    }

    return new ResponseFormatter(product_mixture, 'Product mixture removed');
  }
}
