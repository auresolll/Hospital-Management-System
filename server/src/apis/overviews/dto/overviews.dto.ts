import { ApiProperty } from '@nestjs/swagger';
import { UserType } from './../../../constants/enums';

export class OverviewAnalyticDto {
    @ApiProperty({
        enum: [UserType.DOCTOR, UserType.OPERATOR, UserType.PATIENT],
        required: true,
    })
    userType: UserType;
}
