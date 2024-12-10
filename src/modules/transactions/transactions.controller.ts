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
  NotFoundException,
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
@Controller('transactions')
@UseGuards(AuthGuard)
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Transaction data',
    type: CreateTransactionDto,
  })

  // @Permission('create:transaction')
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

    return new ResponseFormatter(transactions, 'Transactions found');
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Transaction data',
    type: TransactionDtoOut,
  })

  // @Permission('read:transaction')
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const transaction = await this.transactionsService.findOne(+id);

    if (!transaction) {
      return new NotFoundException('Transaction not found');
    }

    return new ResponseFormatter(transaction, 'Transaction found');
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Transaction data',
    type: UpdateTransactionDto,
  })

  // @Permission('update:transaction')
  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateTransactionDto: UpdateTransactionDto
  ) {
    const transaction = await this.transactionsService.update(
      +id, 
      updateTransactionDto,
    );

    return new ResponseFormatter(transaction, 'Transaction updated');
  }

  // @Permission('delete:transaction')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const transaction = await this.transactionsService.remove(+id);

    return new ResponseFormatter(transaction, 'Transaction deleted');
  }
}
