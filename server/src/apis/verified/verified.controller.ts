import { Body, Controller, Post, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiTags } from '@nestjs/swagger';
import { Model } from 'mongoose';
import { generateCode } from './../../extensions/function-helper';
import { User } from './../../models/entities/User.entity';
import { VerifiedCheckDto, VerifiedDto } from './dto/create-verified.dto';
import { VerifiedService } from './verified.service';

@ApiTags('Verified')
@Controller('verified')
export class VerifiedController {
    constructor(
        private readonly verifiedService: VerifiedService,
        @InjectModel(User.name) private userModel: Model<User>,
    ) {}

    @Post('phone/verify')
    async sendVerificationCodeToPhone(@Query() query: VerifiedDto) {
        const user = await this.userModel.findOne({ username: query.username });
        return this.verifiedService.sendVerificationCodeToPhone(
            user,
            generateCode(),
        );
    }

    @Post('mail/verify')
    async sendVerificationCodeToMail(@Query() query: VerifiedDto) {
        const user = await this.userModel.findOne({ username: query.username });
        return this.verifiedService.sendVerificationCodeToMail(
            user,
            generateCode(),
        );
    }

    @Post('phone/verify/check')
    async checkVerificationCode(@Body() query: VerifiedCheckDto) {
        const user = await this.userModel.findOne({ username: query.username });
        return this.verifiedService.checkVerificationCode(user, query);
    }
}
