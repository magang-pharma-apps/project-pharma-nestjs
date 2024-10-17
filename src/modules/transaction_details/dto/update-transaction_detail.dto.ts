import { PartialType } from '@nestjs/swagger';
import { CreateTransactionDetailDto } from './create-transaction_detail.dto';

export class UpdateTransactionDetailDto extends PartialType(CreateTransactionDetailDto) {}
