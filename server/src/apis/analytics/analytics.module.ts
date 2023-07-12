import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Base, BaseSchema } from 'src/models/entities/Base.entity';
import { Doctor, DoctorSchema } from 'src/models/entities/Doctor.entity';
import {
    Inpatient,
    InpatientSchema,
} from 'src/models/entities/Inpatient.entity';
import { Patient, PatientSchema } from 'src/models/entities/Patient.entity';
import { RoleSchema } from 'src/models/entities/Role.entity';
import { Room, RoomSchema } from 'src/models/entities/Room.entity';
import { Role } from './../../decorators/role.decorator';
import {
    Employee,
    EmployeeSchema,
} from './../../models/entities/Employee.entity';
import { Lab, LabSchema } from './../../models/entities/Lab.entity';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Base.name,
                schema: BaseSchema,
            },
            {
                name: Doctor.name,
                schema: DoctorSchema,
            },
            {
                name: Inpatient.name,
                schema: InpatientSchema,
            },
            {
                name: Room.name,
                schema: RoomSchema,
            },
            {
                name: Patient.name,
                schema: PatientSchema,
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
    controllers: [AnalyticsController],
    providers: [AnalyticsService],
})
export class AnalyticsModule {}
