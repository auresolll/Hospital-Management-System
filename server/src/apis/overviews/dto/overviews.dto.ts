import { ApiProperty } from '@nestjs/swagger';
import { UserType } from './../../../constants/enums';

export class OverviewAnalyticDto {
    @ApiProperty({
        required: true,
    })
    year: number;
}
