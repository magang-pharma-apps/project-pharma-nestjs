import { ApiProperty } from "@nestjs/swagger";
// import { TransactionType } from "../entities/transaction.entity";

export class CreateTransactionDto {
    @ApiProperty()
    user_id: number;

    @ApiProperty()
    transaction_date: Date;

    // @ApiProperty()
    // transaction_type: TransactionType; 

    @ApiProperty()
    transaction_type: string;

    @ApiProperty()
    category_type: string;

    @ApiProperty()
    note: string;

    @ApiProperty()
    tax: number;

    @ApiProperty()
    subTotal: number;

    @ApiProperty()
    grandTotal: number;
}
