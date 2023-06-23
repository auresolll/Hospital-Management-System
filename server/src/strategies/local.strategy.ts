import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import _ from 'lodash';
import { Strategy } from 'passport-local';
import { UserLogin } from 'src/apis/auth/dto/user-login.dto';
import { UsersService } from 'src/apis/users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UsersService) {
        super();
    }

    async validate(username: string, password: string) {
        const user = await this.usersService.validateUser(username, password);

        if (!user) {
            return undefined;
        }

        const result: UserLogin = {
            userId: user._id,
            username: user.username,
            role: user.role['name'],
            department: _.get(user, 'departmentDetail.department', null),
        };
        return result;
    }
}
