import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cache } from 'cache-manager';
import { isEqual, isUndefined } from 'lodash';
import { Model } from 'mongoose';
import { TwilioService } from 'nestjs-twilio';
import { appSettings } from './../../configs/appsettings';
import { User } from './../../models/entities/User.entity';
import { AuthenticationService } from './../authentication/authentication.service';
import { VerifiedCheckDto } from './dto/create-verified.dto';

@Injectable()
export class VerifiedService {
    constructor(
        private readonly twilioService: TwilioService,
        @Inject('CACHE_MANAGER') private cacheManager: Cache,
        @InjectModel(User.name) private userModel: Model<User>,
        private mailerService: MailerService,
        private authenticationService: AuthenticationService,
    ) {}

    async sendVerificationCodeToPhone(user: any, code: string) {
        const send = await this.twilioService.client.messages.create({
            body: `Mã xác nhận hệ thống bệnh viện của bạn là: ${code}`,
            from: '+12054795842',
            to: user.phone,
        });

        if (send.errorCode) {
            return { status: false };
        }

        await this.cacheManager.set(`keyCode:#${user.id}`, code, 5 * 60000);
        return { status: true };
    }

    async checkVerificationCode(user: any, verifiedCheckDto: VerifiedCheckDto) {
        const { code } = verifiedCheckDto;
        const codeCache = await this.cacheManager.get(`keyCode:#${user.id}`);

        if (isUndefined(codeCache)) {
            throw new NotFoundException('Bạn chưa gửi mã xác thực');
        }

        if (isEqual(code, codeCache)) {
            await this.cacheManager.del(`keyCode:#${user.id}`);
            const access_token = await this.authenticationService.generateJwt(
                user.username,
            );
            return {
                ...access_token,
                status: true,
                message: 'Đăng nhập thành công!',
            };
        }

        return {
            access_token: null,
            status: false,
            message: 'Mã xác thực không chính xác!',
        };
    }

    async sendVerificationCodeToMail(user: any, code: string) {
        const send = await this.mailerService.sendMail({
            to: user.email,
            from: `"Hỗ trợ viên" ${appSettings.mail.from}`, // override default from
            subject: 'Hệ thống bệnh viện',
            html: `
            <p>Chào mừng bạn đến với cộng đồng SOL!</p>
            
            <p>Nhóm dịch vụ web của Hệ thống bệnh viện</p>
            
            <p>Mã xác nhận hệ thống bệnh viện của bạn là: ${code}</p>`,
            context: {
                name: user.name,
            },
        });

        if (send.rejected.length !== 0) {
            return { status: false };
        }

        await this.cacheManager.set(`keyCode:#${user.id}`, code, 5 * 60000);
        return { status: true };
    }
}
