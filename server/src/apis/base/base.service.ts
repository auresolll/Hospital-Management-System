import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Base } from './../../models/entities/Base.entity';
import { Doctor } from './../../models/entities/Doctor.entity';
import { Inpatient } from './../../models/entities/Inpatient.entity';
import { Patient } from './../../models/entities/Patient.entity';
import { Room } from './../../models/entities/Room.entity';

@Injectable()
export class BaseService {
    constructor(
        @InjectModel(Base.name) private baseModel: Model<Base>,
        @InjectModel(Patient.name) private patientModel: Model<Patient>,
        @InjectModel(Inpatient.name) private inPatientModel: Model<Inpatient>,
        @InjectModel(Doctor.name) private doctorModel: Model<Doctor>,
        @InjectModel(Room.name) private roomModel: Model<Room>,
    ) {}
    async getAll() {
        return this.baseModel.find();
    }
}
