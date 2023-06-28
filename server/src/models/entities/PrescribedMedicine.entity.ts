import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Medicine } from './Medicine.entity';
import { PatientReport } from './PatientReport.entity';

@Schema({ timestamps: true })
export class PrescribedMedicine {
    @Prop({ type: Types.ObjectId, ref: PatientReport.name })
    patientReport: PatientReport;

    @Prop({ type: Types.ObjectId, ref: Medicine.name })
    medicine: Medicine;
}

export const PrescribedMedicineSchema =
    SchemaFactory.createForClass(PrescribedMedicine);
