import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { appSettings } from './../../configs/appsettings';
import { User, UserSchema } from './../../models/entities/User.entity';
import { JwtStrategy } from './../../strategies/jwt.strategy';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';

@Module({
    imports: [
        PassportModule,
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema,
            },
        ]),
        JwtModule.register({
            secret: appSettings.jwt.secret,
            signOptions: { expiresIn: appSettings.jwt.expireIn },
        }),
    ],
    controllers: [AuthenticationController],
    providers: [AuthenticationService, JwtStrategy],
})
export class AuthenticationModule {}
