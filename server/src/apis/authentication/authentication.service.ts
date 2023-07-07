import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { isEmpty } from 'lodash';
import { Model } from 'mongoose';
import { appSettings } from './../../configs/appsettings';
import { generateCode } from './../../extensions/function-helper';
import { User } from './../../models/entities/User.entity';
import { CreateAuthenticationLocalDto } from './dto/create-authentication.dto';
import { SignInAuthenticationDto } from './dto/signIn-authentication.dto';

@Injectable()
export class AuthenticationService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService,
    ) {}

    async registerLocal(
        createAuthenticationLocalDto: CreateAuthenticationLocalDto,
    ) {
        const { username } = createAuthenticationLocalDto;
        const isExits = await this.userModel.findOne({ name: username });
        if (!isEmpty(isExits))
            throw new UnauthorizedException(
                `Tài khoản đã tồn tại! #${username}`,
            );

        const userInfo = await this.userModel.create({
            ...createAuthenticationLocalDto,
            password: await bcrypt.hash(
                createAuthenticationLocalDto.password,
                appSettings.saltOrRounds,
            ),
            code: generateCode(),
        });

        return {
            id: userInfo.id,
        };
    }

    async signInLocal(signInAuthenticationDto: SignInAuthenticationDto) {
        const { username } = signInAuthenticationDto;
        const user = await this.userModel
            .findOne({ name: username })
            .populate('role');

        if (isEmpty(user))
            throw new NotFoundException(
                `Tài khoản không tồn tại! #${username}`,
            );

        const isMatch = await bcrypt.compare(
            signInAuthenticationDto.password,
            user.password,
        );
        if (!isMatch)
            throw new UnauthorizedException(
                `Vui lòng kiểm tra lại mật khẩu tài khoản! #${username}`,
            );

        return {
            status: true,
        };
    }

    async generateJwt(username: string) {
        const user = await this.userModel
            .findOne({ name: username })
            .populate('role');

        if (isEmpty(user))
            throw new NotFoundException(
                `Tài khoản không tồn tại! #${username}`,
            );

        const payload = {
            sub: user.id,
            code: user.code,
            name: user.name,
            country: user.country,
            phone: user.phone,
            gender: user.gender,
            username: user.username,
        };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async getUser(username: string) {
        return this.userModel.findOne({ username }).populate('role');
    }
}
