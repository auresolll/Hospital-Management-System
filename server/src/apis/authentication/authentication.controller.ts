import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticationService } from './authentication.service';
import { CreateAuthenticationLocalDto } from './dto/create-authentication.dto';
import { SignInAuthenticationDto } from './dto/signIn-authentication.dto';

@ApiTags('Authentication')
@Controller('authentication')
export class AuthenticationController {
    constructor(
        private readonly authenticationService: AuthenticationService,
    ) {}

    @Post('register-local')
    registerLocal(@Body() query: CreateAuthenticationLocalDto) {
        return this.authenticationService.registerLocal(query);
    }

    @Post('signIn-local')
    signInLocal(@Body() query: SignInAuthenticationDto) {
        return this.authenticationService.signInLocal(query);
    }
}
