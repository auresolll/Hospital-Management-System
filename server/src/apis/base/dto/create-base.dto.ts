import { ApiProperty } from '@nestjs/swagger';

export class CreateBaseDto {}
export class AnalyticBaseBySemesterDto {
    @ApiProperty()
    start_date: Date;

    @ApiProperty()
    end_date: Date;
}
