import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { UUID } from "crypto";
import { CreateTransactionDetailDto } from "src/modules/transaction_details/dto/create-transaction_detail.dto";
import { IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CategoryType, PaymentMethod, TransactionType } from "../enums/transaction.enums";

export class CreateTransactionDto {
    @ApiPropertyOptional()
    userId: UUID;

    @ApiProperty()
    transactionDate: Date;

    @ApiProperty({ enum: TransactionType })
    transactionType: TransactionType;

    @ApiProperty({ enum: CategoryType })
    categoryType: CategoryType;

    @ApiProperty()
    note: string;

    @ApiProperty()
    tax: number;

    @ApiProperty()
    subTotal: number;

    @ApiProperty()
    grandTotal: number;

    @ApiProperty({ enum: PaymentMethod })
    paymentMethod?: PaymentMethod;

    @ApiProperty({ type: [CreateTransactionDetailDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateTransactionDetailDto)
    items: CreateTransactionDetailDto[];

    // @ApiProperty() // Menggunakan properti untuk id resep jika perlu
    // transactionNumber: number;

    // @ApiProperty() // Menggunakan properti untuk id resep jika perlu
    // redemptionId: number;
}
