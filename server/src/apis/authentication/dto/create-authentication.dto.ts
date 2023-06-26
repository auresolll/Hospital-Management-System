import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Gender } from './../../../constants/enums';

export class CreateAuthenticationDto {}
export class CreateAuthenticationLocalDto {
    @ApiProperty({ required: true, default: 'Test' })
    @IsOptional()
    @IsString()
    name: string;

    @ApiProperty({ required: true, default: 'VN' })
    @IsOptional()
    @IsString()
    country: string;

    @ApiProperty({ required: true, default: '84+ 0334598851' })
    @IsOptional()
    @IsString()
    phone: string;

    @ApiProperty({ required: true, enum: Gender })
    @IsOptional()
    gender: Gender;

    @ApiProperty({ required: true, default: 'Test' })
    @IsOptional()
    @IsString()
    username: string;

    @ApiProperty({ required: true, default: 'Test' })
    @IsOptional()
    @IsString()
    password: string;
}
