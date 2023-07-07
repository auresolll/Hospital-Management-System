import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserType } from './../../constants/enums';

@Schema({ timestamps: true })
export class Role {
    @Prop({ required: true, enum: UserType })
    name: UserType;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
