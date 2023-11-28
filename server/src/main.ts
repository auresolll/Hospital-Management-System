import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import * as compression from "compression";
import * as cookieParser from "cookie-parser";
import helmet from "helmet";
import * as path from "path";
import { AppModule } from "./app/app.module";
import { ExceptionsFilter } from "./core/filter/exceptions.filter";
import { environments } from "./environments/environments";
import { TransformInterceptor } from "./shared/interception/transform.interceptor";
import swaggerInit from "./swagger";

export const urlPublic = path.resolve(__dirname, "..", "public");

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // const logging = new Logging();

  // app.use(
  //   compression({
  //     level: 6,
  //     threshold: 100 * 1000,
  //   })
  // );
  app.use(helmet());
  app.use(cookieParser());
  app.useGlobalInterceptors(
    // new LoggingInterceptor(logging),
    new TransformInterceptor()
  );

  app.useGlobalFilters(new ExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: false }));
  app.useStaticAssets(path.resolve("public"));

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.enableShutdownHooks();

  const PORT = environments.port;

  await swaggerInit(app);

  await app.listen(PORT, () => {
    // logging.debug(`Server đang chạy trên PORT ${PORT}`);
  });
}
bootstrap();
