import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Base, BaseSchema } from './../../models/entities/Base.entity';
import {
    Hospital,
    HospitalSchema,
} from './../../models/entities/Hospital.entity';
import { Patient, PatientSchema } from './../../models/entities/Patient.entity';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Patient.name,
                schema: PatientSchema,
            },
            {
                name: Base.name,
                schema: BaseSchema,
            },
            {
                name: Hospital.name,
                schema: HospitalSchema,
            },
        ]),
    ],
    controllers: [PatientController],
    providers: [PatientService],
})
export class PatientModule {}
