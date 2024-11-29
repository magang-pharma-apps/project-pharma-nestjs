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
import { WarehouseService } from './warehouse.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { ResponseFormatter } from 'src/config/response_formatter';
import { WarehouseDtoOut } from './dto/warehouse.dto';
import { Permission } from 'src/decorators/requires-permission.decorator';

@ApiTags('Warehouse')
@ApiBearerAuth('accessToken')
@UseGuards(AuthGuard)
@Controller('warehouse')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Warehouse data',
    type: CreateWarehouseDto,
  })

  // @Permission('create:warehouse')
  @Post()
  async create(@Body() createWarehouseDto: CreateWarehouseDto) {
    const warehouse = await this.warehouseService.create(createWarehouseDto);

    return new ResponseFormatter(warehouse, 'Warehouse created');
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Warehouse data',
    type: WarehouseDtoOut,
  })

  @Permission('read:warehouse')
  @Get()
  async findAll() {
    const warehouses = await this.warehouseService.findAll();

    if (!warehouses) {
      return new NotFoundException('Warehouses not found');
    }

    return new ResponseFormatter(warehouses, 'Warehouses found');
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Warehouse data',
    type: WarehouseDtoOut,
  })

  // @Permission('read:warehouse')
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const warehouse = await this.warehouseService.findOne(+id);

    if (!warehouse) {
      return new NotFoundException('Warehouse not found');
    }

    return new ResponseFormatter(warehouse, 'Warehouse found');
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Warehouse data',
    type: UpdateWarehouseDto,
  })

  // @Permission('update:warehouse')
  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateWarehouseDto: UpdateWarehouseDto
  ) {
    const warehouse = await this.warehouseService.update(
      +id, 
      updateWarehouseDto
    );

    if (!warehouse) {
      return new NotFoundException('Warehouse not found');
    }

    return new ResponseFormatter(warehouse, 'Warehouse updated');
  }

  // @Permission('delete:warehouse')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const warehouse = await this.warehouseService.remove(+id);

    if (!warehouse) {
      return new NotFoundException('Warehouse not found');
    }

    return new ResponseFormatter(warehouse, 'Warehouse deleted');
  }
}