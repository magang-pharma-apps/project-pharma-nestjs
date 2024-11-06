import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { UUID } from "crypto";
import { PaymentMethod } from "../entities/transaction.entity";
import { CreateTransactionDetailDto } from "src/modules/transaction_details/dto/create-transaction_detail.dto";
import { IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

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

    @ApiProperty()
    paymentMethod?: PaymentMethod;

    @ApiProperty({ type: [CreateTransactionDetailDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateTransactionDetailDto)
    items: CreateTransactionDetailDto[];

    @ApiProperty() // Menggunakan properti untuk id resep jika perlu
    redemptionId: number;
}
