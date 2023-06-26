import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
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
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async registerLocal(
        createAuthenticationLocalDto: CreateAuthenticationLocalDto,
    ) {
        const { username } = createAuthenticationLocalDto;
        const isExits = await this.userModel.findOne({ name: username });
        if (!isEmpty(isExits))
            throw new BadRequestException(`Tài khoản đã tồn tại! #${username}`);

        const userInfo = this.userModel.create({
            ...createAuthenticationLocalDto,
            password: await bcrypt.hash(
                createAuthenticationLocalDto.password,
                appSettings.saltOrRounds,
            ),
            code: generateCode(),
        });

        return userInfo;
    }

    async signInLocal(signInAuthenticationDto: SignInAuthenticationDto) {
        const { username, password } = signInAuthenticationDto;
        const isExits = await this.userModel.findOne({ name: username });
        if (isEmpty(isExits))
            throw new NotFoundException(
                `Tài khoản không tồn tại! #${username}`,
            );

        const isMatch = await bcrypt.compare(password, isExits.password);
        if (!isMatch)
            throw new BadRequestException(`Mật khẩu sai! #${username}`);
    }
}
