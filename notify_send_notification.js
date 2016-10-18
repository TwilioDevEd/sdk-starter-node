require('dotenv').load();;
var twilio = require('twilio');

// Authenticate with Twilio
var client = new twilio(process.env.TWILIO_ACCOUNT_SID,  process.env.TWILIO_AUTH_TOKEN);

// Create a reference to the user notification service
var service = client.notify.v1.services(process.env.TWILIO_NOTIFICATION_SERVICE_SID);

// Send a notification 
service.notifications.create({
  'identity':'' + process.argv.slice(2),
  'body':'Hello, ' + process.argv.slice(2) + '!'
}).then(function(response) {
  console.log(response);
}).catch(function(error) {
  console.log(error);
});
