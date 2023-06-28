import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Insurance } from './Insurance.entity';

@Schema({ timestamps: true })
export class Bill {
    @Prop({ required: true })
    patient_type: string;

    @Prop({ required: true })
    doctor_charge: string;

    @Prop({ required: true })
    operation_charge: string;

    @Prop({ required: true })
    medicine_charge: string;

    @Prop({ required: true })
    room_charge: string;

    @Prop({ required: true })
    nursing_charge: string;

    @Prop({ required: true })
    lab_charge: string;

    @Prop({ required: false })
    insurance_charge: string;

    @Prop({ type: Types.ObjectId, ref: Insurance.name })
    insurance: Insurance;

    @Prop({ required: false })
    total_bill: string;
}

export const BillSchema = SchemaFactory.createForClass(Bill);
