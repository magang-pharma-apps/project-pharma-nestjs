import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  NotFoundException,
  UseGuards,
  HttpStatus
} from '@nestjs/common';
import { InventoriesService } from './inventories.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { ResponseFormatter } from 'src/config/response_formatter';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { InventoryDtoOut } from './dto/inventory.dto';
import { Permission } from 'src/decorators/requires-permission.decorator';

@ApiTags('Inventories')
@ApiBearerAuth('accessToken')
@UseGuards(AuthGuard)
@Controller('inventories')
export class InventoriesController {
  constructor(private readonly inventoriesService: InventoriesService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Inventory data',
    type: CreateInventoryDto,
  })

  // @Permission('create:inventory')
  @Post()
  async create(@Body() createInventoryDto: CreateInventoryDto) {
    const inventory = await this.inventoriesService.create(createInventoryDto);

    return new ResponseFormatter(inventory, 'Inventory created');
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Inventories data',
    type: InventoryDtoOut,
  })

  @Permission('read:inventory')
  @Get()
  async findAll() {
    const inventories = await this.inventoriesService.findAll();

    if (!inventories) {
      return new NotFoundException('Inventories not found');
    }

    return new ResponseFormatter(inventories, 'Inventories found');
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Inventory data',
    type: InventoryDtoOut,
  })

  // @Permission('read:inventory')
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const inventory = await this.inventoriesService.findOne(+id);

    if (!inventory) {
      return new NotFoundException('Inventory not found');
    }

    return new ResponseFormatter(inventory, 'Inventory found');
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Inventory data',
    type: UpdateInventoryDto,
  })

  // @Permission('update:inventory')
  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateInventoryDto: UpdateInventoryDto
  ) {
    const inventory = await this.inventoriesService.update(+id, updateInventoryDto);

    if (!inventory) {
      return new NotFoundException('Inventory not found');
    }

    return new ResponseFormatter(inventory, 'Inventory updated');
  }

  // @Permission('delete:inventory')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const inventory = await this.inventoriesService.remove(+id);

    if (!inventory) {
      return new NotFoundException('Inventory not found');
    } 

    return new ResponseFormatter(inventory, 'Inventory deleted');
  }
}
