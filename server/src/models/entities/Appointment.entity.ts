import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Doctor } from './Doctor.entity';
import { Patient } from './Patient.entity';

@Schema({ timestamps: true })
export class Appointment {
    @Prop({ type: Types.ObjectId, ref: Patient.name })
    patient: Patient;

    @Prop({ type: Types.ObjectId, ref: Doctor.name })
    doctor: Doctor;

    @Prop({ required: true })
    description: string;

    @Prop({ type: Date, required: true })
    date: Date;

    @Prop({ required: true })
    time: string;

    @Prop({ type: Date, required: false })
    deletedAt: Date;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
