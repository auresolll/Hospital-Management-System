import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Patient } from './Patient.entity';
import { Room } from './Room.entity';

@Schema({ timestamps: true })
export class Inpatient {
    @Prop({ type: Types.ObjectId, ref: Room.name })
    room: Room;

    @Prop({ type: Types.ObjectId, ref: Patient.name })
    patient: Patient;

    @Prop({ type: Date, required: true })
    start_date: Date;

    @Prop({ type: Date, required: true })
    end_date: Date;
}

export const InpatientSchema = SchemaFactory.createForClass(Inpatient);
