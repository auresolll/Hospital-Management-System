import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Controller, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Cache } from 'cache-manager';
import { PatientService } from './patient.service';

@ApiTags('Patient')
@Controller('patient')
export class PatientController {
    constructor(
        private readonly patientService: PatientService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}
}
