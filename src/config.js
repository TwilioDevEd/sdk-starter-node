if (process.env.VCAP_SERVICES) {
    var env = JSON.parse(process.env.VCAP_SERVICES);
    var local_creds = env['user-provided'][0].credentials;
    var accountSid = local_creds.accountSID;
} else {
    var accountSid = process.env.TWILIO_ACCOUNT_SID;
}

module.exports = {
    TWILIO_ACCOUNT_SID: accountSid,
    TWILIO_API_KEY: process.env.TWILIO_API_KEY,
    TWILIO_API_SECRET: process.env.TWILIO_API_SECRET,
    TWILIO_CHAT_SERVICE_SID: process.env.TWILIO_CHAT_SERVICE_SID,
    TWILIO_NOTIFICATION_SERVICE_SID: process.env.TWILIO_NOTIFICATION_SERVICE_SID,
    TWILIO_SYNC_SERVICE_SID: process.env.TWILIO_SYNC_SERVICE_SID
}