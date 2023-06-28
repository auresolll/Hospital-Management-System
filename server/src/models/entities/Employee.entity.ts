import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Hospital } from './Hospital.entity';
import { Payroll } from './Payroll.entity';
import { User } from './User.entity';

@Schema({ timestamps: true })
export class Employee {
    @Prop({ type: Types.ObjectId, ref: User.name })
    employee: User;

    @Prop({ type: Types.ObjectId, ref: Hospital.name })
    hospital: Hospital;

    @Prop({ type: Types.ObjectId, ref: Payroll.name })
    payroll: Payroll;

    @Prop({ type: Date, required: false })
    deletedAt: Date;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
