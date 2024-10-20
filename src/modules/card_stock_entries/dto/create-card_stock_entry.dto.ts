import { ApiProperty } from "@nestjs/swagger";

export class CreateCardStockEntryDto {

    @ApiProperty()
    productId: number;

    @ApiProperty()
    tansactionId: number;

    @ApiProperty()
    changeType: boolean;

    @ApiProperty()
    quantityChange: number;

    @ApiProperty()
    dateCardStock: Date;

    @ApiProperty()
    reason: string;
}
