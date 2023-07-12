import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { AnalyticsModule } from './apis/analytics/analytics.module';
import { AuthenticationModule } from './apis/authentication/authentication.module';
import { BaseModule } from './apis/base/base.module';
import { PatientModule } from './apis/patient/patient.module';
import { VerifiedModule } from './apis/verified/verified.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModuleCustom } from './cache/cache.module';
import { appSettings } from './configs/appsettings';
import { LoggingMiddleware } from './middlewares/logging.middleware';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        CacheModule.register({
            isGlobal: true,
        }),
        EventEmitterModule.forRoot(),
        ScheduleModule.forRoot(),
        MongooseModule.forRoot(appSettings.mongoose.dbConn, {
            authSource: 'admin',
            dbName: appSettings.mongoose.dbName,
        }),
        AuthenticationModule,
        BaseModule,
        VerifiedModule,
        PatientModule,
        AnalyticsModule,
        CacheModuleCustom,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_INTERCEPTOR,
            useClass: CacheInterceptor,
        },
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggingMiddleware)
            .forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
