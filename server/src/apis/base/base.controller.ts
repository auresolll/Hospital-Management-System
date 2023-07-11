import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './../../guards/jwt-auth.guard';
import { BaseService } from './base.service';

@ApiTags('Base')
@ApiBearerAuth()
@Controller('base')
export class BaseController {
    constructor(private readonly baseService: BaseService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    findAllBase() {
        return this.baseService.getAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('analytic/base-by-semester')
    findAnalyticBaseBySemester() {
        return this.baseService.getAnalyticBaseBySemester();
    }
}
