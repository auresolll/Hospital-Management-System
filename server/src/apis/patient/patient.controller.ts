import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Cache } from 'cache-manager';
import { OverviewAnalyticDto } from '../overviews/dto/overviews.dto';
import { PatientService } from './patient.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@ApiTags('Patient')
@Controller('patient')
export class PatientController {
    constructor(
        private readonly patientService: PatientService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async findTotalPatientsWithBase(@Query() query: OverviewAnalyticDto) {
        const value: string = await this.cacheManager.get(
            `findTotalPatientsWithBase`,
        );
        if (!value) {
            const minuteMillisecond = 3 * 60 * 1000;
            const response = await this.patientService.getTotalPatientsWithBase(
                query,
            );
            await this.cacheManager.set(
                `findTotalPatientsWithBase`,
                JSON.stringify(response),
                minuteMillisecond,
            );
            return response;
        }
        return JSON.parse(value);
        return;
    }
}
