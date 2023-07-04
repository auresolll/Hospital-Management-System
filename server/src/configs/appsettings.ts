import 'dotenv/config';

export const appSettings = {
    port: process.env.PORT,
    development: process.env.DEVELOPMENT,
    saltOrRounds: Number(process.env.SALTORROUNDS),
    jwt: {
        secret: process.env.JWT_SECRET,
        issuer: process.env.ISSUER,
        expireIn: process.env.EXPIRE_IN,
        refreshExpireIn: Number(process.env.REFRESH_EXPIRE_IN), // second
    },
    mongoose: {
        dbConn: process.env.MONGO_URL,
        dbName: process.env.DB_NAME,
    },
    oidc: {
        sessionSecret: process.env.SESSION_SECRET,
    },
    serviceProviders: {
        google: {
            appId: process.env.GOOGLE_APP_ID,
            appSecret: process.env.GOOGLE_APP_SECRET,
            callback: process.env.GOOGLE_CALLBACK,
        },
    },
    report: {
        expireIn: Number(process.env.EXPIRE_IN_REPORT),
    },
    twilio: {
        accountSid: process.env.TWILIO_ACCOUNT_SID,
        authToken: process.env.TWILIO_AUTH_TOKEN,
    },
    mail: {
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        secure: process.env.MAIL_SECURE === 'true' ? true : false,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD,
        },
        from: process.env.MAIL_FROM,
    },
};
