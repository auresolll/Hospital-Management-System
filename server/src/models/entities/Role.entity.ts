import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from './User.entity';

@Schema({ timestamps: true })
export class Role {
    @Prop({ required: true })
    name: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
