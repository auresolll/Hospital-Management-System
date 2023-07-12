import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isUndefined, max, size } from 'lodash';
import moment from 'moment';
import { Model } from 'mongoose';
import { PatientType } from './../../constants/enums';
import { Base } from './../../models/entities/Base.entity';
import { Doctor } from './../../models/entities/Doctor.entity';
import { Employee } from './../../models/entities/Employee.entity';
import { Inpatient } from './../../models/entities/Inpatient.entity';
import { Lab } from './../../models/entities/Lab.entity';
import { Patient } from './../../models/entities/Patient.entity';
import { Room } from './../../models/entities/Room.entity';
import { OverviewAnalyticDto } from './dto/analytics.dto';

@Injectable()
export class AnalyticsService {
    constructor(
        @InjectModel(Patient.name) private patientModel: Model<Patient>,
        @InjectModel(Room.name) private roomModel: Model<Room>,
        @InjectModel(Base.name) private baseModel: Model<Base>,
        @InjectModel(Inpatient.name) private inPatientModel: Model<Inpatient>,
        @InjectModel(Doctor.name) private doctorModel: Model<Doctor>,
        @InjectModel(Employee.name) private employeeModel: Model<Employee>,
        @InjectModel(Lab.name) private labModel: Model<Lab>,
    ) {}

    async getAnalyticOverviews() {
        const currentDay = moment();
        const previousSecondDay = moment().subtract(15, 'days');
        const previousThirdDay = moment().subtract(30, 'days');

        return Promise.all([
            this.getOverviewPatients(
                currentDay,
                previousSecondDay,
                previousThirdDay,
            ),
            this.getOverviewInPatients(
                currentDay,
                previousSecondDay,
                previousThirdDay,
            ),

            this.getOverviewSurgical(
                currentDay,
                previousSecondDay,
                previousThirdDay,
            ),
        ]);
    }

    async getAnalyticsByRole(options: OverviewAnalyticDto) {
        const resultMap = new Map();
        resultMap.set('patients', {
            name: 'Bệnh nhân',
            type: 'area',
            fill: 'gradient',
            data: [],
        });
        resultMap.set('employees', {
            name: 'Nhân viên',
            type: 'line',
            fill: 'solid',
            data: [],
        });
        resultMap.set('doctors', {
            name: 'Bác sĩ',
            type: 'column',
            fill: 'solid',
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

        const query = [
            {
                $match: {
                    createdAt: {
                        $gte: firstDayInYear,
                        $lte: lastDayInYear,
                    },
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: '%Y-%m-%d',
                            date: '$createdAt',
                        },
                    },
                    count: { $sum: 1 },
                },
            },
        ];

        const [patients, doctors, employees] = await Promise.all([
            this.patientModel.aggregate(query),
            this.doctorModel.aggregate(query),
            this.employeeModel.aggregate(query),
        ]);

        const totalMonths = 12;

        for (let index = 0; index < totalMonths; index++) {
            const bufferPatients = resultMap.get('patients');
            const bufferEmployee = resultMap.get('employees');
            const bufferDoctors = resultMap.get('doctors');

            const patient = patients[index];
            const employee = employees[index];
            const doctor = doctors[index];

            isUndefined(patient)
                ? bufferPatients.data.push(0)
                : bufferPatients.data.push(patient.count);
            isUndefined(employee)
                ? bufferEmployee.data.push(0)
                : bufferEmployee.data.push(employee.count);
            isUndefined(doctor)
                ? bufferDoctors.data.push(0)
                : bufferDoctors.data.push(doctor.count);
        }
        return [...resultMap.values()];
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

    async getOverviewPatients(
        currentDay: moment.Moment,
        previousSecondDay: moment.Moment,
        previousThirdDay: moment.Moment,
    ) {
        return Promise.all([
            this.patientModel.count({
                createdAt: {
                    $gte: previousSecondDay,
                    $lte: currentDay,
                },
            }),
            this.patientModel.count({
                createdAt: {
                    $gte: previousThirdDay,
                    $lte: previousSecondDay,
                },
            }),
            this.patientModel.count({
                createdAt: {
                    $gte: previousThirdDay,
                    $lte: currentDay,
                },
            }),
        ]).then(([countPatient, countPerviousPatient, totalCountInMonth]) => {
            return {
                count: countPatient,
                countPrevious: countPerviousPatient,
                totalCountInMonth: totalCountInMonth,
                // Percentage Increase = [ (Final Value - Starting Value) / |Starting Value| ] × 100
                percentageIncrease:
                    (((countPatient - countPerviousPatient) /
                        countPerviousPatient) *
                        100) |
                    0,
                type: 'Patient',
            };
        });
    }

    async getAnalyticsPatientsWithBase(options: OverviewAnalyticDto) {
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

        const [bases, patients] = await Promise.all([
            this.baseModel.find().select(['_id', 'name']),
            this.patientModel
                .find({
                    createdAt: {
                        $gte: firstDayInYear,
                        $lte: lastDayInYear,
                    },
                })
                .populate('hospital')
                .select(['_id', 'hospital']),
        ]);

        bases.map((base) => {
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

    async getOverviewInPatients(
        currentDay: moment.Moment,
        previousSecondDay: moment.Moment,
        previousThirdDay: moment.Moment,
    ) {
        return Promise.all([
            this.inPatientModel.count({
                createdAt: {
                    $gte: previousSecondDay,
                    $lte: currentDay,
                },
            }),
            this.inPatientModel.count({
                createdAt: {
                    $gte: previousThirdDay,
                    $lte: previousSecondDay,
                },
            }),
            this.inPatientModel.count({
                createdAt: {
                    $gte: previousThirdDay,
                    $lte: currentDay,
                },
            }),
        ]).then(
            ([countInPatient, countPerviousInPatient, totalCountInMonth]) => {
                return {
                    count: countInPatient,
                    countPrevious: countPerviousInPatient,
                    totalCountInMonth: totalCountInMonth,
                    // Percentage Increase = [ (Final Value - Starting Value) / |Starting Value| ] × 100
                    percentageIncrease:
                        (((countInPatient - countPerviousInPatient) /
                            countPerviousInPatient) *
                            100) |
                        0,
                    type: 'InPatient',
                };
            },
        );
    }

    async getOverviewSurgical(
        currentDay: moment.Moment,
        previousSecondDay: moment.Moment,
        previousThirdDay: moment.Moment,
    ) {
        return Promise.all([
            this.labModel.count({
                category: 'PHẪU THUẬT',
                createdAt: {
                    $gte: previousSecondDay,
                    $lte: currentDay,
                },
            }),
            this.labModel.count({
                category: 'PHẪU THUẬT',
                createdAt: {
                    $gte: previousThirdDay,
                    $lte: previousSecondDay,
                },
            }),
            this.labModel.count({
                category: 'PHẪU THUẬT',
                createdAt: {
                    $gte: previousThirdDay,
                    $lte: currentDay,
                },
            }),
        ]).then(([countSurgical, countPreviousSurgical, totalCountInMonth]) => {
            return {
                count: countSurgical,
                countPrevious: countPreviousSurgical,
                totalCountInMonth: totalCountInMonth,
                // Percentage Increase = [ (Final Value - Starting Value) / |Starting Value| ] × 100
                percentageIncrease:
                    (((countSurgical - countPreviousSurgical) /
                        countPreviousSurgical) *
                        100) |
                    0,
                type: 'Surgical',
            };
        });
    }
}
