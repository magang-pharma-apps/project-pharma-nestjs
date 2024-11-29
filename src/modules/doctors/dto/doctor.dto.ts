import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class DoctorDtoOut {
    @ApiPropertyOptional()
    id: number;
    
    @ApiProperty()
    name: string;

    @ApiProperty()
    specialization: string;

    @ApiProperty()
    phoneNumber: string;

    @ApiProperty()
    email: string;
}