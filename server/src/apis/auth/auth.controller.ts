import {
    Controller,
    Get,
    Post,
    Query,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { UserLogin } from './dto/user-login.dto';
import { Response } from 'express';

@Controller('auth')
@ApiTags('Auth Api')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    @UseGuards(LocalAuthGuard)
    async login(@Req() req) {
        if (!req.user) {
            return undefined;
        }
        const { userId, username, role, department } = req.user;

        const userLogin: UserLogin = {
            userId: userId,
            username: username,
            role: role,
            department: department,
        };
        return await this.authService.login(userLogin);
    }

    @Get('google/id-token')
    @ApiQuery({ name: 'access_token', type: String, required: true })
    @ApiQuery({ name: 'fcm_token', type: String, required: false })
    @UseGuards(AuthGuard('google-id-token'))
    async googleVerifyIdToken(@Req() req: Request, @Query() query: any) {
        const result = await this.authService.loginGoogleUser(req.user);
        return result;
    }

    @Get('google/redirect')
    @UseGuards(AuthGuard('google'))
    async googleLoginRedirect(
        @Req() req: any,
        @Res({ passthrough: true }) res: Response,
    ) {
        const result = await this.authService.loginGoogleUser(req.user);
        res.cookie('access_token', result.accessToken, { httpOnly: true });
    }
}
