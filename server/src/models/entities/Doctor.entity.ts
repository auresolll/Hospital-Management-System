import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from './User.entity';

@Schema({ timestamps: true })
export class Doctor {
    @Prop({ type: Types.ObjectId, ref: User.name })
    doctor: User;

    @Prop({ type: Date, required: false })
    deletedAt: Date;
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
