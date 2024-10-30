import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class PrescriptionDtoOut {
    @ApiPropertyOptional()
    id: number;

    @ApiProperty()
    presctiptionCode: String;

    @ApiProperty()
    prescriptions: String;

    @ApiProperty()
    prescriptionDate: Date;

    @ApiProperty()
    doctorId: number;

    @ApiProperty()
    customerId: number;

    @ApiPropertyOptional()
    isRedeem: boolean;
}