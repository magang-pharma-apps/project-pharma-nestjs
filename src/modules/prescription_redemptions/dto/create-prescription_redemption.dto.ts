import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, ValidateNested } from "class-validator";
import { CreateTransactionDto } from "src/modules/transactions/dto/create-transaction.dto";

export class CreatePrescriptionRedemptionDto {
    @ApiProperty()
    prescriptionId: number;

    // @ApiProperty()
    // productId: number;

    // @ApiProperty()
    // price: number;

    @ApiProperty()
    isPaid: boolean;

    @ApiProperty()
    isRedeem: boolean;

    @ApiProperty()
    transactionId: number;

    // Ubah ini menjadi object, bukan array
    @ApiProperty({ type: CreateTransactionDto })
    @IsNotEmpty() // Menandakan bahwa transaksi wajib diisi
    @ValidateNested() // Validasi objek
    @Type(() => CreateTransactionDto) // Konversi tipe ke CreateTransactionDto
    transaction: CreateTransactionDto; // Hanya satu transaksi
}
