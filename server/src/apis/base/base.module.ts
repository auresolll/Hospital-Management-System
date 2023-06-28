import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Base, BaseSchema } from './../../models/entities/Base.entity';
import { BaseController } from './base.controller';
import { BaseService } from './base.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Base.name,
                schema: BaseSchema,
            },
        ]),
    ],
    controllers: [BaseController],
    providers: [BaseService],
})
export class BaseModule {}
