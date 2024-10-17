import { PartialType } from '@nestjs/swagger';
import { CreateCardStockEntryDto } from './create-card_stock_entry.dto';

export class UpdateCardStockEntryDto extends PartialType(CreateCardStockEntryDto) {}
