import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Base } from './entities/base.entity';

@Injectable()
export class BaseService {
    constructor(@InjectModel(Base.name) private baseModel: Model<Base>) {}
    async getAll() {
        return this.baseModel.find();
    }
}
