import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { appSettings } from 'src/configs/appsettings';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/models/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { LocalStrategy } from 'src/strategies/local.strategy';
import { UsersService } from '../users/users.service';
import { Role, RoleSchema } from 'src/models/entities/role.entity';
import { JwtStrategy } from 'src/strategies/jwt.strategy';
import { GoogleVerifyIdTokenStrategy } from '../../strategies/google-verify-id.strategy';
import { GoogleStrategy } from 'src/strategies/google.strategy';

@Module({
    providers: [
        AuthService,
        LocalStrategy,
        UsersService,
        JwtStrategy,
        GoogleVerifyIdTokenStrategy,
        GoogleStrategy,
    ],
    controllers: [AuthController],
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        // configure default options for passport
        PassportModule.register({ session: true, defaultStrategy: 'oidc' }),
        JwtModule.register({
            secret: appSettings.jwt.secret,
            signOptions: {
                expiresIn: appSettings.jwt.expireIn,
                issuer: appSettings.jwt.issuer,
            },
        }),
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Role.name, schema: RoleSchema },
        ]),
    ],
})
export class AuthModule {}
