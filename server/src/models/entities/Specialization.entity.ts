import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from './User.entity';

@Schema({ timestamps: true })
export class Specialization {
    @Prop({ type: Types.ObjectId, ref: User.name })
    manager: User;

    @Prop({ required: true })
    name: string;
}

export const SpecializationSchema =
    SchemaFactory.createForClass(Specialization);
