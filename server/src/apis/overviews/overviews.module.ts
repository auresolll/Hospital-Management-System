import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Role } from './../../decorators/role.decorator';
import { Doctor, DoctorSchema } from './../../models/entities/Doctor.entity';
import {
    Employee,
    EmployeeSchema,
} from './../../models/entities/Employee.entity';
import {
    Inpatient,
    InpatientSchema,
} from './../../models/entities/Inpatient.entity';
import { Lab, LabSchema } from './../../models/entities/Lab.entity';
import { Patient, PatientSchema } from './../../models/entities/Patient.entity';
import { RoleSchema } from './../../models/entities/Role.entity';
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
            {
                name: Doctor.name,
                schema: DoctorSchema,
            },
            {
                name: Employee.name,
                schema: EmployeeSchema,
            },
            {
                name: Role.name,
                schema: RoleSchema,
            },
        ]),
    ],
    controllers: [OverviewsController],
    providers: [OverviewsService],
})
export class OverviewsModule {}
