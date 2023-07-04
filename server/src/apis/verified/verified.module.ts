import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TwilioModule } from 'nestjs-twilio';
import { AuthenticationModule } from '../authentication/authentication.module';
import { appSettings } from './../../configs/appsettings';
import { twilioConfig } from './../../configs/twilio/twilio.setting';
import { User, UserSchema } from './../../models/entities/User.entity';
import { VerifiedController } from './verified.controller';
import { VerifiedService } from './verified.service';

@Module({
    imports: [
        TwilioModule.forRoot(twilioConfig),
        MailerModule.forRoot({
            transport: {
                // host: 'smtp.example.com',
                host: appSettings.mail.host,
                port: appSettings.mail.port,
                secure: appSettings.mail.secure, // use SSL
                service: 'Gmail',
                auth: {
                    user: appSettings.mail.auth.user,
                    pass: appSettings.mail.auth.pass,
                },
            },
            defaults: {
                from: '"No Reply" <noreply@example.com>',
            },
        }),
        AuthenticationModule,
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema,
            },
        ]),
    ],
    controllers: [VerifiedController],
    providers: [VerifiedService],
})
export class VerifiedModule {}
