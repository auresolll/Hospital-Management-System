import 'dotenv/config';

export const appSettings = {
    port: process.env.PORT,
    development: process.env.DEVELOPMENT,
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
};
