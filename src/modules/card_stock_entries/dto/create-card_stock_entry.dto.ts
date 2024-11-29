import { ApiProperty } from "@nestjs/swagger";
import { ChangeType } from "../entities/card_stock_entry.entity";

export class CreateCardStockEntryDto {

    @ApiProperty()
    productId: number;

    @ApiProperty()
    tansactionId: number;

    @ApiProperty({ enum: ChangeType})
    changeType: ChangeType;

    @ApiProperty()
    quantityChange: number;

    @ApiProperty()
    dateCardStock: Date;

    @ApiProperty()
    reason: string;
}
