import { JwtAuthGuard } from './../../guards/jwt-auth.guard';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Cache } from 'cache-manager';
import { OverviewsService } from './overviews.service';

@ApiTags('Overviews')
@ApiBearerAuth()
@Controller('overviews')
export class OverviewsController {
    constructor(
        private readonly overviewsService: OverviewsService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async findOverviews() {
        const value: string = await this.cacheManager.get('getOverviews');
        if (!value) {
            const minuteMillisecond = 3 * 60 * 1000;
            const response = await this.overviewsService.getOverviews();
            await this.cacheManager.set(
                'getOverviews',
                JSON.stringify(response),
                minuteMillisecond,
            );
            return response;
        }
        return JSON.parse(value);
    }
}
