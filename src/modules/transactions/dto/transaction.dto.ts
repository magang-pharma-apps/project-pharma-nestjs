import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { UUID } from "crypto";
// import { TransactionType } from "../entities/transaction.entity";

export class TransactionDtoOut {
    @ApiPropertyOptional()
    id: number;

    @ApiPropertyOptional()
    userId: UUID;

    @ApiProperty()
    transactionDate: Date;

    // @ApiProperty()
    // transaction_type: TransactionType;

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
}
