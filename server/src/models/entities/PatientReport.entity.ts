import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Doctor } from './Doctor.entity';
import { Patient } from './Patient.entity';

@Schema({ timestamps: true })
export class PatientReport {
    @Prop({ type: Types.ObjectId, ref: Patient.name })
    patient: Patient;

    @Prop({ type: Types.ObjectId, ref: Doctor.name })
    doctor: Doctor;

    @Prop({ required: true })
    diagnose: string;

    @Prop({ required: false, type: Date })
    deletedAt: Date;
}

export const PatientReportSchema = SchemaFactory.createForClass(PatientReport);
