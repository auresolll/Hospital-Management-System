import { Employee } from './../../models/entities/Employee.entity';
import { Doctor } from './../../models/entities/Doctor.entity';
import {
    BadRequestException,
    ForbiddenException,
    Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import moment from 'moment';
import mongoose, { Model } from 'mongoose';
import { Inpatient } from './../../models/entities/Inpatient.entity';
import { Lab } from './../../models/entities/Lab.entity';
import { Patient } from './../../models/entities/Patient.entity';
import { OverviewAnalyticDto } from './dto/overviews.dto';
import { UserType } from './../../constants/enums';
import { isUndefined, max, size } from 'lodash';

@Injectable()
export class OverviewsService {
    constructor(
        @InjectModel(Patient.name) private patientModel: Model<Patient>,
        @InjectModel(Inpatient.name) private inPatientModel: Model<Inpatient>,
        @InjectModel(Doctor.name) private doctorModel: Model<Doctor>,
        @InjectModel(Employee.name) private employeeModel: Model<Employee>,
        @InjectModel(Lab.name) private labModel: Model<Lab>,
    ) {}

    async getOverviews() {
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
