import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Base } from './Base.entity';
import { Department } from './Department.entity';
import { Semester } from './Semester.entity';

@Schema({ timestamps: true })
export class Hospital {
    @Prop({ type: Types.ObjectId, ref: Department.name })
    department: Department;

    @Prop({ type: Types.ObjectId, ref: Semester.name })
    semester: Semester;

    @Prop({ type: Types.ObjectId, ref: Base.name })
    base: Base;
}

export const HospitalSchema = SchemaFactory.createForClass(Hospital);
