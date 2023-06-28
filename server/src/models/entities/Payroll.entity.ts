import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Payroll {
    @Prop({ required: true, default: 0 })
    salary: number;

    @Prop({ required: true, default: 0 })
    net_salary: number;

    @Prop({ required: true, default: 0 })
    hour_salary: number;

    @Prop({ required: true, default: 0 })
    bonus_salary: number;

    @Prop({ required: true, default: 0 })
    compensation: number;

    @Prop({ required: false })
    IBan: number;

    @Prop({ required: false })
    bank_name: string;
}

export const PayrollSchema = SchemaFactory.createForClass(Payroll);
