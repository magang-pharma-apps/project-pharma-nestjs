import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  UseGuards,
  HttpStatus
} from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { ResponseFormatter } from 'src/config/response_formatter';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { SupplierDtoOut } from './dto/supplier.dto';
import { Permission } from 'src/decorators/requires-permission.decorator';

@ApiTags('Suppliers')
@ApiBearerAuth('accessToken')
@Controller('suppliers')
@UseGuards(AuthGuard)
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Supplier data',
    type: CreateSupplierDto,
  })

  // @Permission('create:supplier')
  @Post()
  async create(@Body() createSupplierDto: CreateSupplierDto) {
    const supplier = await this.suppliersService.create(createSupplierDto);

    return new ResponseFormatter(supplier, 'Supplier created');
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Supplier data',
    type: SupplierDtoOut,
  })

  @Permission('read:supplier')
  @Get()
  async findAll() {
    const suppliers = await this.suppliersService.findAll();

    return new ResponseFormatter(suppliers, 'Suppliers found');
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Supplier data',
    type: SupplierDtoOut,
  })

  // @Permission('read:supplier')
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const supplier = await this.suppliersService.findOne(+id);

    return new ResponseFormatter(supplier, 'Supplier found');
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Supplier data',
    type: UpdateSupplierDto,
  })

  // @Permission('update:supplier')
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSupplierDto: UpdateSupplierDto
  ) {
    const supplier = await this.suppliersService.update(
      +id, 
      updateSupplierDto
    );

    return new ResponseFormatter(supplier, 'Supplier updated');
  }

  // @Permission('delete:supplier')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const supplier = await this.suppliersService.remove(+id);

    return new ResponseFormatter(supplier, 'Supplier deleted');
  }
}
