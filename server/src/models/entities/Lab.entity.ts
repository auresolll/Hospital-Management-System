import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { TestPrice } from './TestPrice.entity';
import { Patient } from './Patient.entity';

@Schema({ timestamps: true })
export class Lab {
    @Prop({ type: Types.ObjectId, ref: Patient.name })
    patient: Patient;

    @Prop({ required: true })
    weight: string;

    @Prop({ required: true })
    height: string;

    @Prop({ required: true })
    bool_pressure: number;

    @Prop({ required: true })
    temperature: number;

    @Prop({ type: Date, required: true })
    date: Date;

    @Prop({ required: true })
    category: string;

    @Prop({ required: true })
    test_result: string;

    @Prop({ type: Types.ObjectId, ref: TestPrice.name })
    testPrice: TestPrice;

    @Prop({ type: Date, required: false })
    deletedAt: Date;
}

export const LabSchema = SchemaFactory.createForClass(Lab);
