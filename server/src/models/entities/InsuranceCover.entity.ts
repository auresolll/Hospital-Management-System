import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class InsuranceCover {
    @Prop({ required: true })
    company: string;

    @Prop({ required: true })
    insurance_plan: string;

    @Prop({ required: true })
    entry_fees: number;

    @Prop({ required: true })
    max_pay: number;
}

export const InsuranceCoverSchema =
    SchemaFactory.createForClass(InsuranceCover);
