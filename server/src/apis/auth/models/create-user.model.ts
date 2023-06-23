import { Types } from 'mongoose';

export class CreateUserModel {
    email: string;
    name: string;
    departmentDetail: string;
    role: Types.ObjectId;
    username: string;
    password: string;
    phone: string;
    status: string;
    fcm_tokens: Array<string>;
    avatar: string;
}
