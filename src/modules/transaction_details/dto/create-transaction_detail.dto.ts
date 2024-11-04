import { ApiProperty } from "@nestjs/swagger";

export class CreateTransactionDetailDto {
    @ApiProperty()
    productId: number;

    // @ApiProperty()
    // transactionId: number;

    @ApiProperty()
    quantity: number;

    @ApiProperty()
    note: string;
}
