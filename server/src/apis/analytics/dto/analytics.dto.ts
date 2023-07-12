import { ApiProperty } from '@nestjs/swagger';

export class OverviewAnalyticDto {
    @ApiProperty({
        required: true,
    })
    year: number;
}
