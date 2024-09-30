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
import { CompoundProductsService } from './compound_products.service';
import { CreateCompoundProductDto } from './dto/create-compound_product.dto';
import { UpdateCompoundProductDto } from './dto/update-compound_product.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { ResponseFormatter } from 'src/config/response_formatter';
import { CompoundProductDtoOut } from './dto/compound_product.dto';
import { Permission } from 'src/decorators/requires-permission.decorator';

@ApiTags('Compound Products')
@ApiBearerAuth('accessToken')
@UseGuards(AuthGuard)
@Controller('compound-products')
export class CompoundProductsController {
  constructor(private readonly compoundProductsService: CompoundProductsService) {}

  @Post()
  async create(@Body() createCompoundProductDto: CreateCompoundProductDto) {
    const compoundProduct = await this.compoundProductsService.create(createCompoundProductDto);

    return new ResponseFormatter(compoundProduct, 'Compound product created');
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Compound product data',
    type: CompoundProductDtoOut,
  })

  @Permission('read:compound-products')
  @Get()
  async findAll() {
    const compoundProducts = await this.compoundProductsService.findAll();

    if (!compoundProducts) {
      return new NotFoundException('Compound products not found');
    }

    return new ResponseFormatter(compoundProducts, 'Compound products found');
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Compound product data',
    type: CompoundProductDtoOut,
  })

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const compoundProduct = await this.compoundProductsService.findOne(+id);

    if (!compoundProduct) {
      return new NotFoundException('Compound product not found');
    }

    return new ResponseFormatter(compoundProduct, 'Compound product found');
  }

  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateCompoundProductDto: UpdateCompoundProductDto
  ) {
    const compoundProduct = await this.compoundProductsService.update(+id, updateCompoundProductDto);

    if (!compoundProduct) {
      return new NotFoundException('Compound product not found');
    }

    return new ResponseFormatter(compoundProduct, 'Compound product updated');
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const compoundProduct = await this.compoundProductsService.remove(+id);

    if (!compoundProduct) {
      return new NotFoundException('Compound product not found');
    }

    return new ResponseFormatter(compoundProduct, 'Compound product removed');
  }
}
