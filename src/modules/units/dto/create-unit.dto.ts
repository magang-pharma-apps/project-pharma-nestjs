import { ApiProperty } from "@nestjs/swagger";

export class CreateUnitDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    // @ApiProperty()
    // status: boolean;
}
