import { ApiProperty } from "@nestjs/swagger";
// import { TransactionType } from "../entities/transaction.entity";

export class CreateTransactionDto {
    @ApiProperty()
    product_id: number;

    @ApiProperty()
    user_id: number;

    @ApiProperty()
    quantity: number;

    // @ApiProperty()
    // total_price: number;

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
}
