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
import { StockAdjustmentsService } from './stock_adjustments.service';
import { CreateStockAdjustmentDto } from './dto/create-stock_adjustment.dto';
import { UpdateStockAdjustmentDto } from './dto/update-stock_adjustment.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { ResponseFormatter } from 'src/config/response_formatter';
import { StockAdjustmentDtoOut } from './dto/stock_adjustment.dto';
import { Not } from 'typeorm';

@ApiTags('Stock Adjustments')
@ApiBearerAuth('accessToken')
@UseGuards(AuthGuard)
@Controller('stock-adjustments')
export class StockAdjustmentsController {
  constructor(private readonly stockAdjustmentsService: StockAdjustmentsService) {}

  @Post()
  async create(@Body() createStockAdjustmentDto: CreateStockAdjustmentDto) {
    const stock_adjustment = await this.stockAdjustmentsService.create(createStockAdjustmentDto);

    return new ResponseFormatter(stock_adjustment, 'Stock Adjustment created');
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Stock Adjustment data',
    type: StockAdjustmentDtoOut,
  })

  @Get()
  async findAll() {
    const stock_adjustments = await this.stockAdjustmentsService.findAll();

    if (!stock_adjustments) {
      return new NotFoundException('Stock Adjustments not found');
    }

    return new ResponseFormatter(stock_adjustments, 'Stock Adjustments found');
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Stock Adjustment data',
    type: StockAdjustmentDtoOut,
  })

  @Get(':id')
 async findOne(@Param('id') id: string) {
    const stock_adjustment = await this.stockAdjustmentsService.findOne(+id);

    if (!stock_adjustment) {
      return new ResponseFormatter([], 'Stock Adjustment not found');
    }

    return new ResponseFormatter(stock_adjustment, 'Stock Adjustment found');
  }

  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateStockAdjustmentDto: UpdateStockAdjustmentDto
  ) {
    const stock_adjustment = await this.stockAdjustmentsService.update(+id, updateStockAdjustmentDto);

    if (!stock_adjustment) {
      return new NotFoundException('Stock Adjustment not found');
    }

    return new ResponseFormatter(stock_adjustment, 'Stock Adjustment updated');}

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const stock_adjustment = await this.stockAdjustmentsService.remove(+id);

    if (!stock_adjustment) {
      return new NotFoundException('Stock Adjustment not found');
    }

    return new ResponseFormatter(stock_adjustment, 'Stock Adjustment removed');
  }
}
