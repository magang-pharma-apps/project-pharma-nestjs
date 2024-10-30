import { ApiProperty } from "@nestjs/swagger";

export class CreatePrescriptionRedemptionDto {
    @ApiProperty()
    prescriptionId: number;

    @ApiProperty()
    productId: number;

    @ApiProperty()
    price: number;

    @ApiProperty()
    isPaid: boolean;
}
