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
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { ResponseFormatter } from 'src/config/response_formatter';
import { TransactionDtoOut } from './dto/transaction.dto';
import { Permission } from 'src/decorators/requires-permission.decorator';

@ApiTags('Transactions')
@ApiBearerAuth('accessToken')
@UseGuards(AuthGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  async create(@Body() createTransactionDto: CreateTransactionDto) {
    const transaction = await this.transactionsService.create(createTransactionDto);

    return new ResponseFormatter(transaction, 'Transaction created');
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Transaction data',
    type: TransactionDtoOut,
  })

  @Permission('read:transaction')
  @Get()
  async findAll() {
    const transactions = await this.transactionsService.findAll();

    if (!transactions) {
      return new NotFoundException('Transactions not found');
    }

    return new ResponseFormatter(transactions, 'Transactions found');
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Transaction data',
    type: TransactionDtoOut,
  })

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const transaction = await this.transactionsService.findOne(+id);

    if (!transaction) {
      return new NotFoundException('Transaction not found');
    } 

    return new ResponseFormatter(transaction, 'Transaction found');
  }

  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateTransactionDto: UpdateTransactionDto
  ) {
    const transaction = await this.transactionsService.update(+id, updateTransactionDto);

    if (!transaction) {
      return new NotFoundException('Transaction not found');
    }

    return new ResponseFormatter(transaction, 'Transaction updated');
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const transaction = await this.transactionsService.remove(+id);

    if (!transaction) {
      return new NotFoundException('Transaction not found');
    }

    return new ResponseFormatter(transaction, 'Transaction removed');
  }
}
