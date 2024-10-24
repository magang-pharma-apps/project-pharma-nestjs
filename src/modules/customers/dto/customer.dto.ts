import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CustomerDtoOut {
    @ApiPropertyOptional()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    age: number;

    @ApiProperty()
    address: string;
}