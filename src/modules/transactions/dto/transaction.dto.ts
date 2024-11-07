import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { UUID } from "crypto";
import { Transaction } from "typeorm";
import { CategoryType, PaymentMethod, TransactionType } from "../enums/transaction.enums";
// import { TransactionType } from "../entities/transaction.entity";

export class TransactionDtoOut {
    @ApiPropertyOptional()
    id: number;

    @ApiPropertyOptional()
    userId: UUID;

    @ApiProperty()
    transactionDate: Date;

    @ApiProperty({ enum: TransactionType })
    transactionType: TransactionType;
    
    @ApiProperty( { enum: CategoryType })
    categoryType: CategoryType;

    @ApiProperty()
    note: string;

    @ApiProperty()
    tax: number;

    @ApiProperty()
    subTotal: number;

    @ApiProperty()
    grandTotal: number;

    @ApiPropertyOptional({ enum: PaymentMethod })
    paymentMethod?: PaymentMethod;

    @ApiProperty() // Menggunakan properti untuk id resep jika perlu
    redemptionId: number;
}
