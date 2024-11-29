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
import { Permission } from 'src/decorators/requires-permission.decorator';


@ApiTags('Transaction Details')
@ApiBearerAuth('accessToken')
@UseGuards(AuthGuard)
@Controller('transaction-details')
export class TransactionDetailsController {
  constructor(private readonly transactionDetailsService: TransactionDetailsService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Transaction detail data',
    type: [CreateTransactionDetailDto],
  })

  // @Permission('create:transaction-detail')
  @Post()
  async create(@Body() createTransactionDetailDto: CreateTransactionDetailDto | CreateTransactionDetailDto[]) {
    const transactionDetails = await this.transactionDetailsService.create(createTransactionDetailDto);

    // Kembalikan data dalam bentuk array agar konsisten
    const formattedResponse = Array.isArray(transactionDetails)
      ? transactionDetails
      : [transactionDetails];

    return new ResponseFormatter(formattedResponse, 'Transaction Details created');
  }


  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Transaction detail data',
    type: TransactionDetailDtoOut,
  })

  // @Permission('read:transaction-detail')
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
    description: 'Transaction detail data',
    type: TransactionDetailDtoOut,
  })

  // @Permission('read:transaction-detail')
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const transactionDetail = await this.transactionDetailsService.findOne(+id);

    if (!transactionDetail) {
      return new NotFoundException('Transaction Detail not found');
    }

    return new ResponseFormatter(transactionDetail, 'Transaction Detail found');
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Transaction detail data',
    type: UpdateTransactionDetailDto,
  })

  // @Permission('update:transaction-detail')
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

  // @Permission('delete:transaction-detail')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const transactionDetail = await this.transactionDetailsService.remove(+id);

    if (!transactionDetail) {
      return new NotFoundException('Transaction Detail not found');
    }

    return new ResponseFormatter(transactionDetail, 'Transaction Detail deleted');
  }
}
