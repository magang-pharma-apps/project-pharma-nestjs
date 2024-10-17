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
import { StockOpnameEntriesService } from './stock_opname_entries.service';
import { CreateStockOpnameEntryDto } from './dto/create-stock_opname_entry.dto';
import { UpdateStockOpnameEntryDto } from './dto/update-stock_opname_entry.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { ResponseFormatter } from 'src/config/response_formatter';
import { StockOpnameEntryDtoOut } from './dto/stock_opname_entry.dto';
import { Not } from 'typeorm';

@ApiTags('Stock Opname Entries')
@ApiBearerAuth('accessToken')
@UseGuards(AuthGuard)
@Controller('stock-opname-entries')
export class StockOpnameEntriesController {
  constructor(private readonly stockOpnameEntriesService: StockOpnameEntriesService) {}

  @Post()
  async create(@Body() createStockOpnameEntryDto: CreateStockOpnameEntryDto) {
    const stockOpnameEntry = await this.stockOpnameEntriesService.create(createStockOpnameEntryDto);

    return new ResponseFormatter(stockOpnameEntry, 'Stock Opname Entry created');
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Stock Opname Entries data',
    type: StockOpnameEntryDtoOut
  })

  @Get()
  async findAll() {
    const stockOpnameEntries = await this.stockOpnameEntriesService.findAll();

    if (!stockOpnameEntries) {
      return new NotFoundException('Stock Opname Entries not found');
    }

    return new ResponseFormatter(stockOpnameEntries, 'Stock Opname Entries found');
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Stock Opname Entries data',
    type: StockOpnameEntryDtoOut
  })

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const stockOpnameEntry = await this.stockOpnameEntriesService.findOne(+id);

    if (!stockOpnameEntry) {
      return new NotFoundException('Stock Opname Entry not found');
    }

    return new ResponseFormatter(stockOpnameEntry, 'Stock Opname Entry found');
  }

  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateStockOpnameEntryDto: UpdateStockOpnameEntryDto
  ) {
    const stockOpnameEntry = await this.stockOpnameEntriesService.update(+id, updateStockOpnameEntryDto);

    if (!stockOpnameEntry) {
      return new NotFoundException('Stock Opname Entry not found');
    }

    return new ResponseFormatter(stockOpnameEntry, 'Stock Opname Entry updated');
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const stockOpnameEntry = await this.stockOpnameEntriesService.remove(+id);

    if (!stockOpnameEntry) {
      return new NotFoundException('Stock Opname Entry not found');
    }

    return new ResponseFormatter(stockOpnameEntry, 'Stock Opname Entry deleted');
  }
}
