import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
    Inpatient,
    InpatientSchema,
} from './../../models/entities/Inpatient.entity';
import { Lab, LabSchema } from './../../models/entities/Lab.entity';
import { Patient, PatientSchema } from './../../models/entities/Patient.entity';
import { OverviewsController } from './overviews.controller';
import { OverviewsService } from './overviews.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Patient.name,
                schema: PatientSchema,
            },
            {
                name: Inpatient.name,
                schema: InpatientSchema,
            },
            {
                name: Lab.name,
                schema: LabSchema,
            },
        ]),
    ],
    controllers: [OverviewsController],
    providers: [OverviewsService],
})
export class OverviewsModule {}
