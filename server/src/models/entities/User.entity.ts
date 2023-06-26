import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Base } from './Base.entity';

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true })
    name: string;

    @Prop({ required: false })
    avatar: string;

    @Prop({ required: true })
    code: string;

    @Prop({ required: true })
    country: string;

    @Prop({ required: true })
    gender: string;

    @Prop({ required: true })
    phone: string;

    @Prop({ required: false })
    email: string;

    @Prop({ required: false })
    username: string;

    @Prop({ required: false })
    password: string;

    @Prop({ type: Types.ObjectId, ref: Base.name })
    base: Base;

    @Prop({ required: false })
    address: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
