import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Contact {
    @Prop({ required: true })
    hotline: string;

    @Prop({ required: true })
    email: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
