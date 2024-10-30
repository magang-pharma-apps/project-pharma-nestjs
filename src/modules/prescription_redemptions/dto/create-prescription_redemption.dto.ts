import { ApiProperty } from "@nestjs/swagger";

export class CreatePrescriptionRedemptionDto {
    @ApiProperty()
    prescription_id: string;

    @ApiProperty()
    product_id: string;

    @ApiProperty()
    price: number;

    @ApiProperty()
    is_paid: boolean;
}
