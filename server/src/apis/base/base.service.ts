import { PatientType } from './../../constants/enums';
import { Doctor } from './../../models/entities/Doctor.entity';
import { Hospital } from 'src/models/entities/Hospital.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Base } from './../../models/entities/Base.entity';
import { Inpatient } from './../../models/entities/Inpatient.entity';
import { Patient } from './../../models/entities/Patient.entity';
import { Room } from './../../models/entities/Room.entity';
import { isUndefined, max, size } from 'lodash';

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

    async getAnalyticBaseBySemester() {
        const [baseList, patientList, doctorList, roomList] = await Promise.all(
            [
                this.baseModel.find(),
                this.patientModel.find().populate('hospital'),
                this.doctorModel.find().populate('hospital'),
                this.roomModel.find(),
            ],
        );

        const resultBuffer = new Map();
        baseList.map((base) => {
            // Example: [HCM: 1] => [HCM: 2] => [HCM: 3]
            resultBuffer.set(String(base.id), {
                name: base.name,
                countPatients: 0,
                countDoctors: 0,
                countRoom: 0,
                countPatientDischarged: 0,
                countPatientReExamination: 0,
            });
        });

        const maxLength = max([size(patientList), size(doctorList)]);

        for (let index = 0; index < maxLength; index++) {
            const patient = patientList[index];
            const doctor = doctorList[index];
            const room = roomList[index];

            if (!isUndefined(patient)) {
                const baseID = String(patient.hospital.base);
                const result = resultBuffer.get(baseID);
                result.countPatients++;
                switch (patient.category) {
                    case PatientType.RE_EXAMINATION:
                        result.countPatientReExamination++;
                        break;
                    case PatientType.CHECKUP:
                        result.countPatientDischarged++;
                        break;
                }
            }

            if (!isUndefined(doctor)) {
                // Example: baseID = HCM => get object HCM and update count doctors
                const baseID = String(doctor.hospital.base);
                const result = resultBuffer.get(baseID);
                result.countDoctors++;
            }

            if (!isUndefined(room)) {
                const baseID = String(room.base);
                const result = resultBuffer.get(baseID);
                result.countRoom++;
            }
        }

        return [...resultBuffer.values()];
    }
}
