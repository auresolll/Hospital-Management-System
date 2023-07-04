import { ApiProperty } from '@nestjs/swagger';

export class VerifiedDto {
    @ApiProperty()
    username: string;
}
export class VerifiedCheckDto {
    @ApiProperty()
    code: string;

    @ApiProperty()
    username: string;
}
