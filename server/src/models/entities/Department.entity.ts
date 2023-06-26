import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from './User.entity';

@Schema({ timestamps: true })
export class Department {
    @Prop()
    code: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    banner: string;

    @Prop({ required: true })
    description: string;

    @Prop({ type: Types.ObjectId, ref: User.name })
    manager: User;
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);
