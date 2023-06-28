import { RoomType } from './../../constants/enums';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Base } from './Base.entity';

@Schema({ timestamps: true })
export class Room {
    @Prop({ required: true })
    area: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true, enum: RoomType })
    room_type: RoomType;

    @Prop({ required: true })
    max_bed: number;

    @Prop({ type: Types.ObjectId, ref: Base.name })
    base: Base;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
