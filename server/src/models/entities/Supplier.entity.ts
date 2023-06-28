import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Supplier {
    @Prop({ required: true })
    company: string;

    @Prop({ required: true })
    phone: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    address: string;
}

export const SupplierSchema = SchemaFactory.createForClass(Supplier);
