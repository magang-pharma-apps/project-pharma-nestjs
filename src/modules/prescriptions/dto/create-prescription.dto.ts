import { ApiProperty } from "@nestjs/swagger";

export class CreatePrescriptionDto {
    @ApiProperty()
    prescriptionCode: string;

    @ApiProperty()
    prescription: string;

    @ApiProperty()
    prescriptionDate: Date;

    @ApiProperty()
    doctorId: number;

    @ApiProperty()
    customerId: number;

    @ApiProperty()
    isRedeem: boolean;
}
