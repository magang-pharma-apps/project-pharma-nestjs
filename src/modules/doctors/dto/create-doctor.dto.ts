import { ApiProperty } from "@nestjs/swagger";

export class CreateDoctorDto {
    @ApiProperty()
    name: string

    @ApiProperty()
    specialization: string

    @ApiProperty()
    phoneNumber: string

    @ApiProperty()
    email: string
}
