import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Medicine {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    cost: number;

    @Prop({ required: true })
    medicine_type: string;

    @Prop({ required: false, type: Date })
    deletedAt: Date;
}

export const MedicineSchema = SchemaFactory.createForClass(Medicine);
