import { Base } from './../../models/entities/Base.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BaseService {
    constructor(@InjectModel(Base.name) private baseModel: Model<Base>) {}
    async getAll() {
        return this.baseModel.find();
    }
}
