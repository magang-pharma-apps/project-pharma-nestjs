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
import { TransactionDetailsService } from './transaction_details.service';
import { CreateTransactionDetailDto } from './dto/create-transaction_detail.dto';
import { UpdateTransactionDetailDto } from './dto/update-transaction_detail.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { ResponseFormatter } from 'src/config/response_formatter';
import { TransactionDetailDtoOut } from './dto/transaction_detail.dto';
import { Not } from 'typeorm';


@ApiTags('Transaction Details')
@ApiBearerAuth('accessToken')
@UseGuards(AuthGuard)
@Controller('transaction-details')
export class TransactionDetailsController {
  constructor(private readonly transactionDetailsService: TransactionDetailsService) {}

  @Post()
  async create(@Body() createTransactionDetailDto: CreateTransactionDetailDto) {
    const transactionDetail = await this.transactionDetailsService.create(createTransactionDetailDto);

    return new ResponseFormatter(transactionDetail, 'Transaction Detail created');
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'transaction detail data',
    type: TransactionDetailDtoOut,
  })

  @Get()
  async findAll() {
    const transactionDetails = await this.transactionDetailsService.findAll();

    if (!transactionDetails) {
      return new NotFoundException('Transaction Details not found');
    }

    return new ResponseFormatter(transactionDetails, 'Transaction Details found');
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'transaction detail data',
    type: TransactionDetailDtoOut,
  })

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const transactionDetail = await this.transactionDetailsService.findOne(+id);

    if (!transactionDetail) {
      return new NotFoundException('Transaction Detail not found');
    }

    return new ResponseFormatter(transactionDetail, 'Transaction Detail found');
  }

  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateTransactionDetailDto: UpdateTransactionDetailDto
  ) {
    const transactionDetail = await this.transactionDetailsService.update(+id, updateTransactionDetailDto);

    if (!transactionDetail) {
      return new NotFoundException('Transaction Detail not found');
    }

    return new ResponseFormatter(transactionDetail, 'Transaction Detail updated');
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const transactionDetail = await this.transactionDetailsService.remove(+id);

    if (!transactionDetail) {
      return new NotFoundException('Transaction Detail not found');
    }

    return new ResponseFormatter(transactionDetail, 'Transaction Detail deleted');
  }
}
