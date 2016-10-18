require('dotenv').load();;
var twilio = require('twilio');

// Authenticate with Twilio
var client = new twilio(process.env.TWILIO_ACCOUNT_SID,  process.env.TWILIO_AUTH_TOKEN);

// Create a user notification service instance
var serviceData = {
  friendlyName: 'My First Notifications App'
}

if (process.env.TWILIO_APN_CREDENTIAL_SID != "") {
  serviceData.apnCredentialSid = process.env.TWILIO_APN_CREDENTIAL_SID
  console.log("Adding APN Credentials to service")
} else {
  console.log("No APN Credentials configured - add in .env, if available.")
}

if (process.env.TWILIO_GCM_CREDENTIAL_SID != "") {
  serviceData.gcmCredentialSid = process.env.TWILIO_GCM_CREDENTIAL_SID
  console.log("Adding GCM Credentials to service")
} else {
  console.log("No GCM Credentials configured - add in .env, if available.")
}

client.notify.v1.services.create(serviceData).then(function(response) {
  console.log(response);
}).catch(function(error) {
  console.log(error);
});
