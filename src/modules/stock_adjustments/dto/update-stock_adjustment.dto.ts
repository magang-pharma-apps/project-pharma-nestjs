import { PartialType } from '@nestjs/swagger';
import { CreateStockAdjustmentDto } from './create-stock_adjustment.dto';

export class UpdateStockAdjustmentDto extends PartialType(CreateStockAdjustmentDto) {}
