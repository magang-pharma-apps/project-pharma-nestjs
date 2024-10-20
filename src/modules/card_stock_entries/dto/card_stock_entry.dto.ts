import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CardStockEntryDtoOut {
    @ApiPropertyOptional()
    id: number;

    @ApiPropertyOptional()
    productId: number;

    @ApiPropertyOptional()
    transactionId: number;

    @ApiProperty()
    changeType: boolean;

    @ApiProperty()
    quantityChange: number;

    @ApiProperty()
    dateCardStock: Date;

    @ApiProperty()
    reason: string;
}