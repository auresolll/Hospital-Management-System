import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import moment from 'moment';
import { Model } from 'mongoose';
import { Hospital } from 'src/models/entities/Hospital.entity';
import { Base } from './../../models/entities/Base.entity';
import { Patient } from './../../models/entities/Patient.entity';
import { OverviewAnalyticDto } from './../overviews/dto/overviews.dto';

@Injectable()
export class PatientService {
    constructor(
        @InjectModel(Patient.name) private patientModel: Model<Patient>,
        @InjectModel(Base.name) private baseModel: Model<Base>,
        @InjectModel(Hospital.name) private hospitalModel: Model<Hospital>,
    ) {}
    async getTotalPatientsWithBase(options: OverviewAnalyticDto) {
        const bufferBase = new Map();
        const bufferResult = new Map();
        bufferResult.set('result', {
            base: [],
            data: [],
        });
        const firstDayInYear = moment()
            .year(options.year)
            .startOf('year')
            .toDate();
        const lastDayInYear = moment()
            .year(options.year)
            .endOf('year')
            .toDate();

        const [allBases, patients] = await Promise.all([
            this.baseModel.find().select(['_id', 'name']),
            this.patientModel
                .find({
                    createdAt: {
                        $gte: firstDayInYear,
                        $lte: lastDayInYear,
                    },
                })
                .populate('hospital'),
        ]);

        allBases.map((base) => {
            bufferBase.set(String(base.id), 0);
            bufferResult.get('result').base.push(base.name);
            bufferResult.get('result').data.push(0);
        });

        patients.map((patient) => {
            const base = bufferBase.get(String(patient.hospital.base));
            bufferBase.set(String(patient.hospital.base), base + 1);
        });

        bufferResult.get('result').data = [...bufferBase.values()];
        return bufferResult.get('result');
    }
}
