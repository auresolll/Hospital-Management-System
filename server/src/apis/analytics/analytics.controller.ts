import { CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CacheService } from './../../cache/cache.service';
import { AnalyticsService } from './analytics.service';
import { OverviewAnalyticDto } from './dto/analytics.dto';

@ApiTags('Analytics')
@ApiBearerAuth()
@Controller('analytics')
export class AnalyticsController {
    constructor(
        private readonly analyticsService: AnalyticsService,
        private readonly cacheService: CacheService,
    ) {}

    @Get('findAnalyticBaseBySemester')
    @CacheKey('findAnalyticBaseBySemester')
    @CacheTTL(3 * 60 * 1000)
    findAnalyticBaseBySemester() {
        return this.analyticsService.getAnalyticBaseBySemester();
    }

    @Get('findAnalyticOverviews')
    @CacheKey('findAnalyticOverviews')
    @CacheTTL(3 * 60 * 1000)
    findAnalyticOverviews() {
        return this.analyticsService.getAnalyticOverviews();
    }

    @Get('findAnalyticsToRole')
    async findAnalyticsToRole(@Query() query: OverviewAnalyticDto) {
        return this.cacheService.cache({
            key: `findAnalyticsToRole::${query.year}`,
            minuteMillisecond: 3 * 60 * 1000,
            callback: await this.analyticsService.getAnalyticsByRole(query),
        });
    }

    @Get('findAnalyticsPatientsWithBase')
    async findAnalyticsPatientsWithBase(@Query() query: OverviewAnalyticDto) {
        return this.cacheService.cache({
            key: `findAnalyticsPatientsWithBase::${query.year}`,
            minuteMillisecond: 3 * 60 * 1000,
            callback: await this.analyticsService.getAnalyticsPatientsWithBase(
                query,
            ),
        });
    }
}
