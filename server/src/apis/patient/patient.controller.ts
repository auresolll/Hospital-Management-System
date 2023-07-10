import { Controller, Get, Query } from '@nestjs/common';
import { PatientService } from './patient.service';
import { OverviewAnalyticDto } from '../overviews/dto/overviews.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Patient')
@Controller('patient')
export class PatientController {
    constructor(private readonly patientService: PatientService) {}

    @Get()
    findTotalPatientsWithBase(@Query() query: OverviewAnalyticDto) {
        return this.patientService.getTotalPatientsWithBase(query);
    }
}
