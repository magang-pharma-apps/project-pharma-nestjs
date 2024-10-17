import { PartialType } from '@nestjs/swagger';
import { CreateStockOpnameEntryDto } from './create-stock_opname_entry.dto';

export class UpdateStockOpnameEntryDto extends PartialType(CreateStockOpnameEntryDto) {}
