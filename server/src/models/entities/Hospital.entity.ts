import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Base } from './Base.entity';
import { Department } from './Department.entity';

@Schema({ timestamps: true })
export class Hospital {
    @Prop({ type: Types.ObjectId, ref: Department.name })
    department: Department;

    @Prop({ type: Types.ObjectId, ref: Base.name })
    base: Base;
}

export const HospitalSchema = SchemaFactory.createForClass(Hospital);
