import { Injectable, Logger, NestMiddleware, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class LoggingMiddleware implements NestMiddleware {
    private readonly logger = new Logger(LoggingMiddleware.name);
    async use(req: any, res: any, next: () => void) {
        // const postMulterRequest = await new Promise((resolve, reject) => {

        //     multer().any()(req, {}, function (err) {
        //         if (err) reject(err);
        //         resolve(req);
        //     });
        // });
        // console.log('form data', JSON.stringify(req.formData));
        next();
    }
}
