import {
    Controller,
    Get,
    Post,
    Query,
    Request,
    UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
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
    registerLocal(@Query() query: CreateAuthenticationLocalDto) {
        return this.authenticationService.registerLocal(query);
    }

    @Post('signIn-local')
    signInLocal(@Query() query: SignInAuthenticationDto) {
        return this.authenticationService.signInLocal(query);
    }
}
