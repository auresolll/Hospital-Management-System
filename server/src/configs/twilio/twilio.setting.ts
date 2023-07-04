import { appSettings } from '../appsettings';

export const twilioConfig = {
    accountSid: appSettings.twilio.accountSid,
    authToken: appSettings.twilio.authToken,
};
