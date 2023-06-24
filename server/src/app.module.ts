import { classes } from '@automapper/classes';
import { CamelCaseNamingConvention } from '@automapper/core';
import { AutomapperModule } from '@automapper/nestjs';
import { CacheModule } from '@nestjs/cache-manager';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { appSettings } from './configs/appsettings';
import { LoggingMiddleware } from './middlewares/logging.middleware';

@Module({
    imports: [
        CacheModule.register(),
        EventEmitterModule.forRoot(),
        ScheduleModule.forRoot(),
        MongooseModule.forRoot(appSettings.mongoose.dbConn, {
            authSource: 'admin',
            dbName: appSettings.mongoose.dbName,
        }),
        AutomapperModule.forRoot([
            {
                name: 'classes',
                strategyInitializer: classes(),
                namingConventions: new CamelCaseNamingConvention(),
            },
        ]),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggingMiddleware)
            .forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
