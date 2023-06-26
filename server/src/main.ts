import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import compression from 'compression';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import { isEqual } from 'lodash';
import passport from 'passport';
import { AppModule } from './app.module';
import { appSettings } from './configs/appsettings';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { TransformInterceptor } from './interceptors/transform.interceptor';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.enableCors();

    // Init Login interceptor
    app.useGlobalInterceptors(
        new LoggingInterceptor(),
        new TransformInterceptor(),
    );

    const mongoUrl = `${appSettings.mongoose.dbConn}/${appSettings.mongoose.dbName}?authSource=admin`;

    const refreshTokenExpireMillisecond =
        appSettings.jwt.refreshExpireIn * 1000;
    const minuteMillisecond = 60 * 1000;
    app.use(
        session({
            store: new MongoStore({ mongoUrl: mongoUrl }),
            secret: appSettings.oidc.sessionSecret,
            resave: false,
            saveUninitialized: false,
            rolling: true,
            cookie: {
                maxAge: refreshTokenExpireMillisecond + minuteMillisecond,
                httpOnly: true,
            },
        }),
    );

    app.use(
        compression({
            level: 6,
            threshold: 100 * 1000,
        }),
    );
    app.use(passport.initialize());
    app.use(passport.session());
    app.useGlobalPipes(
        new ValidationPipe({ transform: true, whitelist: false }), // temp
    );

    if (isEqual(process.env.DEVELOPMENT, 'true')) {
        const config = new DocumentBuilder()
            .setTitle('Hospital Management Server')
            .setDescription('The Hospital API description')
            .setVersion('1.0')
            .build();

        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('docs', app, document);
    }

    console.log(`Application running at http://localhost:${appSettings.port}`);
    await app.listen(appSettings.port);
}
bootstrap();
