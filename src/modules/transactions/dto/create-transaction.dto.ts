import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { UUID } from "crypto";

export class CreateTransactionDto {
    @ApiPropertyOptional()
    userId: UUID;

    @ApiProperty()
    transactionDate: Date;

    @ApiProperty()
    transactionType: string;

    @ApiProperty()
    categoryType: string;

    @ApiProperty()
    note: string;

    @ApiProperty()
    tax: number;

    @ApiProperty()
    subTotal: number;

    @ApiProperty()
    grandTotal: number;

    // @ApiProperty()
    // detail: transactiondetail[];

}
