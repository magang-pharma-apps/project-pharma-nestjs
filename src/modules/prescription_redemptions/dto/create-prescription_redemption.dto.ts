import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";
import { CreateTransactionDto } from "src/modules/transactions/dto/create-transaction.dto";

export class CreatePrescriptionRedemptionDto {
    @ApiProperty()
    prescriptionId: number;

    // @ApiProperty()
    // productId: number;

    @ApiProperty()
    price: number;

    @ApiProperty()
    isPaid: boolean;

    @ApiProperty({ type: [CreateTransactionDto] })
    @IsArray() // Validasi bahwa ini adalah array
    @ValidateNested({ each: true }) // Validasi setiap item dalam array
    @Type(() => CreateTransactionDto) // Konversi tipe ke CreateTransactionDto
    transactions: CreateTransactionDto[]; // Menambahkan transactions
}
