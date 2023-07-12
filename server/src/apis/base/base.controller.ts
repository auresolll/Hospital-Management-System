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
}
