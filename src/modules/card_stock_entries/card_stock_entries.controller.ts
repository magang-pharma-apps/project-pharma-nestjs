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
import { CardStockEntriesService } from './card_stock_entries.service';
import { CreateCardStockEntryDto } from './dto/create-card_stock_entry.dto';
import { UpdateCardStockEntryDto } from './dto/update-card_stock_entry.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { ResponseFormatter } from 'src/config/response_formatter';
import { CardStockEntryDtoOut } from './dto/card_stock_entry.dto';
import { Not } from 'typeorm';

@ApiTags('Card Stock Entries')
@ApiBearerAuth('accessToken')
@UseGuards(AuthGuard)
@Controller('card-stock-entries')
export class CardStockEntriesController {
  constructor(private readonly cardStockEntriesService: CardStockEntriesService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Card stock entry data',
    type: CreateCardStockEntryDto,
  })

  // @Permission('create:card stock entry')
  @Post()
  async create(@Body() createCardStockEntryDto: CreateCardStockEntryDto) {
    const cardStockEntry = await this.cardStockEntriesService.create(createCardStockEntryDto);

    return new ResponseFormatter(cardStockEntry, 'Card stock entry created.');
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Card stock entry data',
    type: CardStockEntryDtoOut,
  })

  // @Permission('read:card stock entry')
  @Get()
  async findAll() {
    const cardStockEntries = await this.cardStockEntriesService.findAll();

    if (!cardStockEntries) {
      return new NotFoundException (cardStockEntries, 'Card stock entries not found.');
    }

    return new ResponseFormatter(cardStockEntries, 'Card stock entries found.');
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Card stock entry data',
    type: CardStockEntryDtoOut,
  })

  // @Permission('read:card stock entry')
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const cardStockEntry = await this.cardStockEntriesService.findOne(+id);

    if (!cardStockEntry) {
      return new NotFoundException (cardStockEntry, 'Card stock entry not found.');
    }

    return new ResponseFormatter(cardStockEntry, 'Card stock entry found.');
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Card stock entry data',
    type: UpdateCardStockEntryDto,
  })

  // @Permission('update:card stock entry')
  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateCardStockEntryDto: UpdateCardStockEntryDto
  ) {
    const cardStockEntry = await this.cardStockEntriesService.update(+id, updateCardStockEntryDto);

    if (!cardStockEntry) {
      return new NotFoundException ('Card stock entry not found.');
    } 

    return new ResponseFormatter(cardStockEntry, 'Card stock entry updated.');
  }

  // @Permission('delete:card stock entry')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const cardStockEntry = await this.cardStockEntriesService.remove(+id);

    if (!cardStockEntry) { 
      return new NotFoundException ('Card stock entry not found.');
    }

    return new ResponseFormatter(cardStockEntry, 'Card stock entry removed.');
  }
}
