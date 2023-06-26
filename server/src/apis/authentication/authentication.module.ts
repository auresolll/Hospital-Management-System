import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Base, BaseSchema } from './../../models/entities/Base.entity';
import { User, UserSchema } from './../../models/entities/User.entity';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema,
            },
        ]),
    ],
    controllers: [AuthenticationController],
    providers: [AuthenticationService],
})
export class AuthenticationModule {}
