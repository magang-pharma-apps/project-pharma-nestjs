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
import { WarehouseService } from './warehouse.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { ResponseFormatter } from 'src/config/response_formatter';
import { WarehouseDtoOut } from './dto/warehouse.dto';

@ApiTags('Warehouse')
@ApiBearerAuth('accessToken')
@Controller('warehouse')
@UseGuards(AuthGuard)
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Warehouse data',
    type: CreateWarehouseDto,
  })

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

  @Get()
  async findAll() {
    const warehouses = await this.warehouseService.findAll();

    return new ResponseFormatter(warehouses, 'Warehouses found');
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Warehouse data',
    type: WarehouseDtoOut,
  })

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const warehouse = await this.warehouseService.findOne(+id);

    return new ResponseFormatter(warehouse, 'Warehouse found');
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Warehouse data',
    type: UpdateWarehouseDto,
  })

  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateWarehouseDto: UpdateWarehouseDto
  ) {
    const warehouse = await this.warehouseService.update(
      +id, 
      updateWarehouseDto
    );

    return new ResponseFormatter(warehouse, 'Warehouse updated');
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const warehouse = await this.warehouseService.remove(+id);

    return new ResponseFormatter(warehouse, 'Warehouse deleted');
  }
}
