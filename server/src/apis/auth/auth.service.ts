import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/models/entities/user.entity';
import { CreateUserModel } from './models/create-user.model';
import { Status } from 'src/constants/enums';
import { JwtService } from '@nestjs/jwt';
import { appSettings } from 'src/configs/appsettings';
import { UserLogin } from './dto/user-login.dto';
import _ from 'lodash';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        private jwtService: JwtService,
    ) {}

    async loginGoogleUser(
        user: any,
    ): Promise<{ accessToken: string; refreshToken: string } | undefined> {
        const { email, sub: username, name, picture } = user;
        const userExit = await this.userModel
            .findOne({ email: email })
            .populate('role')
            .populate('departmentDetail');

        const userLogin: UserLogin = {
            userId: _.get(userExit, '_id', null),
            username: username,
            role: _.get(userExit, 'role.name', null),
            department: _.get(userExit, 'departmentDetail.department', null),
        };

        if (!userExit) {
            const userDto: CreateUserModel = {
                email: email,
                name: name,
                departmentDetail: null,
                role: new mongoose.Types.ObjectId(process.env.OPERATOR_ROLE),
                username: username,
                password: '',
                phone: '',
                status: Status.ACTIVE,
                fcm_tokens: [],
                avatar: picture,
            };

            const newUser = await this.userModel.create(userDto);
            userLogin.role = newUser.role.name;
            userLogin.userId = newUser._id;
            return await this.generateJwtToken(userLogin);
        }
        return await this.generateJwtToken(userLogin);
    }

    async login(
        userLogin: UserLogin,
    ): Promise<{ accessToken: string; refreshToken: string } | undefined> {
        return await this.generateJwtToken(userLogin);
    }

    private async generateJwtToken(payload: UserLogin) {
        const refreshToken = await this.jwtService.signAsync(
            {
                sub: payload.userId,
            },
            {
                expiresIn: appSettings.jwt.refreshExpireIn,
            },
        );
        const accessToken = await this.jwtService.signAsync(payload);
        return {
            accessToken,
            refreshToken,
        };
    }
}
