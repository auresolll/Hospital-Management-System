import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { InsuranceCover } from './InsuranceCover.entity';
import { Patient } from './Patient.entity';

@Schema({ timestamps: true })
export class Insurance {
    @Prop({ type: Types.ObjectId, ref: Patient.name })
    patient: Patient;

    @Prop({ type: Types.ObjectId, ref: InsuranceCover.name })
    insuranceCover: InsuranceCover;

    @Prop({ required: true })
    policy: string;

    @Prop({ required: true })
    insurance_type: string;

    @Prop({ required: true })
    code: string;

    @Prop({ type: Date, required: true })
    publish_date: Date;

    @Prop({ type: Date, required: true })
    expire_date: Date;

    @Prop({ type: Date, required: false })
    deletedAt: Date;
}

export const InsuranceSchema = SchemaFactory.createForClass(Insurance);
