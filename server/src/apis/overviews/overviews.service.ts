import { Employee } from './../../models/entities/Employee.entity';
import { Doctor } from './../../models/entities/Doctor.entity';
import {
    BadRequestException,
    ForbiddenException,
    Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import moment from 'moment';
import { Model } from 'mongoose';
import { Inpatient } from './../../models/entities/Inpatient.entity';
import { Lab } from './../../models/entities/Lab.entity';
import { Patient } from './../../models/entities/Patient.entity';
import { OverviewAnalyticDto } from './dto/overviews.dto';
import { UserType } from './../../constants/enums';

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

    async getAnalyticsByRole(role: OverviewAnalyticDto) {
        return {
            ...(role.userType === UserType.PATIENT && {
                result: await this.patientModel.aggregate([
                    {
                        $group: {
                            _id: {
                                $dateToString: {
                                    format: '%Y-%m',
                                    date: '$createdAt',
                                },
                            },
                            count: { $sum: 1 },
                        },
                    },
                ]),
            }),
            ...(role.userType === UserType.DOCTOR && {
                result: await this.doctorModel.aggregate([
                    {
                        $group: {
                            _id: {
                                $dateToString: {
                                    format: '%Y-%m',
                                    date: '$createdAt',
                                },
                            },
                            count: { $sum: 1 },
                        },
                    },
                ]),
            }),
            ...(role.userType === UserType.OPERATOR && {
                result: await this.employeeModel.aggregate([
                    {
                        $group: {
                            _id: {
                                $dateToString: {
                                    format: '%Y-%m',
                                    date: '$createdAt',
                                },
                            },
                            count: { $sum: 1 },
                        },
                    },
                ]),
            }),
        };
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
