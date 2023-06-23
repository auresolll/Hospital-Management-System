import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { appSettings } from 'src/configs/appsettings';
import { Request } from 'express';
import { UserType } from 'src/constants/enums';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: appSettings.jwt.secret,
            issuer: appSettings.jwt.issuer,
            passReqToCallback: true,
        });
    }

    async validate(req: Request, payload: any, done: any) {
        return {
            _id: payload.userId,
            username: payload.username,
            role: payload.role,
            department: payload.department,
        };
    }
}
