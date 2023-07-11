import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Cache } from 'cache-manager';
import { JwtAuthGuard } from './../../guards/jwt-auth.guard';
import { BaseService } from './base.service';

@ApiTags('Base')
@ApiBearerAuth()
@Controller('base')
export class BaseController {
    constructor(
        private readonly baseService: BaseService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    findAllBase() {
        return this.baseService.getAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('analytic/base-by-semester')
    async findAnalyticBaseBySemester() {
        const value: string = await this.cacheManager.get(
            `analytic/base-by-semester`,
        );
        if (!value) {
            const minuteMillisecond = 3 * 60 * 1000;
            const response = await this.baseService.getAnalyticBaseBySemester();
            await this.cacheManager.set(
                `analytic/base-by-semester`,
                JSON.stringify(response),
                minuteMillisecond,
            );
            return response;
        }
        return JSON.parse(value);
    }
}
