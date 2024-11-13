import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ChangeType } from "../entities/card_stock_entry.entity";

export class CardStockEntryDtoOut {
    @ApiPropertyOptional()
    id: number;

    @ApiPropertyOptional()
    productId: number;

    @ApiPropertyOptional()
    transactionId: number;

    @ApiProperty({ enum: ChangeType})
    changeType: ChangeType;

    @ApiProperty()
    quantityChange: number;

    @ApiProperty()
    dateCardStock: Date;

    @ApiProperty()
    reason: string;
}