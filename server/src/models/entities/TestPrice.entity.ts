import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class TestPrice {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    price: number;
}

export const TestPriceSchema = SchemaFactory.createForClass(TestPrice);
