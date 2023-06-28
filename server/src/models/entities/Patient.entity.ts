import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Doctor } from './Doctor.entity';
import { Hospital } from './Hospital.entity';
import { User } from './User.entity';

@Schema({ timestamps: true })
export class Patient {
    @Prop({ type: Types.ObjectId, ref: User.name })
    patient: User;

    @Prop({ type: Types.ObjectId, ref: Hospital.name })
    hospital: Hospital;

    @Prop({ type: Types.ObjectId, ref: Doctor.name })
    doctor: Doctor;

    @Prop({ required: false })
    weight: number;

    @Prop({ required: false })
    height: number;

    @Prop({ type: Date, required: false })
    deletedAt: Date;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
