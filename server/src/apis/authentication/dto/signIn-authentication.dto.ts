import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SignInAuthenticationDto {
    @ApiProperty({ required: true, default: 'Test' })
    @IsOptional()
    @IsString()
    username: string;

    @ApiProperty({ required: true, default: 'Test' })
    @IsOptional()
    @IsString()
    password: string;
}
