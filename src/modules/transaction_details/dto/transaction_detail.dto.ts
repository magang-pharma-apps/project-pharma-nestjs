import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class TransactionDetailDtoOut {

    @ApiPropertyOptional()
    id: number;

    @ApiProperty()
    productId: number;

    @ApiProperty()
    transactionId: number;

    @ApiProperty()
    quantity: number

    @ApiProperty()
    note: string
}