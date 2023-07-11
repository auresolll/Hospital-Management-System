import { Room, RoomSchema } from './../../models/entities/Room.entity';
import {
    Inpatient,
    InpatientSchema,
} from './../../models/entities/Inpatient.entity';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Base, BaseSchema } from './../../models/entities/Base.entity';
import { Doctor, DoctorSchema } from './../../models/entities/Doctor.entity';
import { Patient, PatientSchema } from './../../models/entities/Patient.entity';
import { BaseController } from './base.controller';
import { BaseService } from './base.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Base.name,
                schema: BaseSchema,
            },
            {
                name: Patient.name,
                schema: PatientSchema,
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
        ]),
    ],
    controllers: [BaseController],
    providers: [BaseService],
})
export class BaseModule {}
