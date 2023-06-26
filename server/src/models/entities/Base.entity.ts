import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Contact } from './Contact.entity';
import { User } from './User.entity';

@Schema({ timestamps: true })
export class Base {
    @Prop({ type: Types.ObjectId, ref: 'User' })
    manager: User;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    images: string[];

    @Prop({ required: true })
    country: string;

    @Prop({ required: true })
    are: string;

    @Prop({ required: true })
    road: string;

    @Prop({ type: Types.ObjectId, ref: Contact.name })
    contact: Contact;
}

export const BaseSchema = SchemaFactory.createForClass(Base);
