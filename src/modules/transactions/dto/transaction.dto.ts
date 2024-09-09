import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { TransactionType } from "../entities/transaction.entity";

export class TransactionDtoOut {
    @ApiPropertyOptional()
    id: number;

    @ApiPropertyOptional()
    product_id: number;

    @ApiPropertyOptional()
    user_id: number;

    @ApiProperty()
    quantity: number;

    @ApiProperty()
    total_price: number;

    @ApiProperty()
    transaction_date: Date;

    @ApiProperty()
    transaction_type: TransactionType; 

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
