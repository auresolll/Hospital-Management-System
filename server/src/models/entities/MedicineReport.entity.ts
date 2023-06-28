import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Base } from './Base.entity';

@Schema({ timestamps: true })
export class MedicineReport {
    @Prop({ type: Types.ObjectId, ref: Base.name })
    base: Base;

    @Prop({ required: true })
    company: string;

    @Prop({ required: true, default: 0 })
    quantity: number;

    @Prop({ required: true, type: Date })
    production_date: Date;

    @Prop({ required: true, type: Date })
    expire_date: Date;

    @Prop({ required: true })
    country: string;

    @Prop({ required: false, type: Date })
    deletedAt: Date;
}

export const MedicineReportSchema =
    SchemaFactory.createForClass(MedicineReport);
