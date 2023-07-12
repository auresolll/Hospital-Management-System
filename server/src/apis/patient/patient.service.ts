import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import moment from 'moment';
import { Model } from 'mongoose';
import { Hospital } from 'src/models/entities/Hospital.entity';
import { Base } from './../../models/entities/Base.entity';
import { Patient } from './../../models/entities/Patient.entity';

@Injectable()
export class PatientService {
    constructor(
        @InjectModel(Patient.name) private patientModel: Model<Patient>,
        @InjectModel(Base.name) private baseModel: Model<Base>,
        @InjectModel(Hospital.name) private hospitalModel: Model<Hospital>,
    ) {}
}
