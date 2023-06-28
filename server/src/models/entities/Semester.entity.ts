import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Semester {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    year: number;

    @Prop({ type: Date, required: true })
    start_date: Date;

    @Prop({ type: Date, required: true })
    end_date: Date;
}

export const SemesterSchema = SchemaFactory.createForClass(Semester);
