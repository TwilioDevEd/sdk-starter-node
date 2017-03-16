// Node/Express
var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var pug = require('pug');

// Twilio Library
var Twilio = require('twilio');

// Access Token used for Video, IP Messaging, and Sync
var AccessToken = Twilio.jwt.AccessToken;

// Grant Video capability
var ConversationsGrant = AccessToken.ConversationsGrant;

// Grant IP Messaging capability
var IpMessagingGrant = AccessToken.IpMessagingGrant;

// Grant Sync capability
var SyncGrant = AccessToken.SyncGrant;

// Process environment variables
require('dotenv').load();

// Create a random user name if we need one for identity purposes
var randomUsername = require('./randos');


// Create Express webapp
var app = express();
app.use(express.static(path.join(__dirname, 'public')));

// Add body parser for Notify device registration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Basic health check - check environment variables have been configured
// correctly
app.get('/config', function(request, response) {
  response.json( {
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_NOTIFICATION_SERVICE_SID: process.env.TWILIO_NOTIFICATION_SERVICE_SID,
    TWILIO_API_KEY: process.env.TWILIO_API_KEY,
    TWILIO_API_SECRET: process.env.TWILIO_API_SECRET != '',
    TWILIO_CHAT_SERVICE_SID: process.env.TWILIO_CHAT_SERVICE_SID,
    TWILIO_SYNC_SERVICE_SID: process.env.TWILIO_SYNC_SERVICE_SID,
    TWILIO_CONFIGURATION_SID: process.env.TWILIO_CONFIGURATION_SID
  });
});

/*
Generate an Access Token for an application user - it generates a random
username for the client requesting a token, and takes a device ID as a query
parameter.
*/
app.get('/token', function(request, response) {
    
    // Create an access token which we will sign and return to the client
    var token = new AccessToken(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_API_KEY,
        process.env.TWILIO_API_SECRET
    );

    // Assign the generated identity to the token
    token.identity = randomUsername();

    //grant the access token Twilio Video capabilities
    if (process.env.TWILIO_CONFIGURATION_SID) {
        var conversationsGrant = new ConversationsGrant();
        conversationsGrant.configurationProfileSid = process.env.TWILIO_CONFIGURATION_SID;
        token.addGrant(conversationsGrant);
    }

    if (process.env.TWILIO_CHAT_SERVICE_SID) {
        // Create a unique ID for the client on their current device
        var appName = 'TwilioChatDemo';
        // Create a "grant" which enables a client to use IPM as a given user,
        // on a given device
        var ipmGrant = new IpMessagingGrant({
            serviceSid: process.env.TWILIO_CHAT_SERVICE_SID
        });
        token.addGrant(ipmGrant);
    }

    if (process.env.TWILIO_SYNC_SERVICE_SID) {
        // Create a unique ID for the client on their current device
        var appName = 'TwilioSyncDemo';
        
        // Create a "grant" which enables a client to use Sync as a given user,
        // on a given device
        var syncGrant = new SyncGrant({
            serviceSid: process.env.TWILIO_SYNC_SERVICE_SID
        });
        token.addGrant(syncGrant);
    }

    // Serialize the token to a JWT string and include it in a JSON response
    response.send({
        identity: token.identity,
        token: token.toJwt()
    });
});


// Notify - create a device binding from a POST HTTP request
app.post('/register', function(request, response) {
  
  // Authenticate with Twilio
var client = new Twilio(process.env.TWILIO_API_KEY,  process.env.TWILIO_API_SECRET, null, {accountSid:process.env.TWILIO_ACCOUNT_SID});
  
  // Get a reference to the user notification service instance
  var service = client.notify.v1.services(process.env.TWILIO_NOTIFICATION_SERVICE_SID);

  service.bindings.create({
    "endpoint": request.body.endpoint,
    "identity": request.body.identity,
    "bindingType": request.body.BindingType,
    "address": request.body.Address
  }).then(function(binding) {
    var message = 'Binding created!';
    console.log(binding);
    // Send a JSON response indicating success
    response.send({
      message: message
    });
  }).catch(function(error) {
    var message = 'Failed to create binding: ' + error;
    console.log(message);
    
    // Send a JSON response indicating an internal server error
    response.status(500).send({
      error: error,
      message: message
    });
  });
});

// Notify - send a notification from a POST HTTP request
app.post('/send-notification', function(request, response) {
  
  // Authenticate with Twilio
  var client = new Twilio(process.env.TWILIO_API_KEY,  process.env.TWILIO_API_SECRET, null, {accountSid:process.env.TWILIO_ACCOUNT_SID});

  // Create a reference to the user notification service
  var service = client.notify.v1.services(process.env.TWILIO_NOTIFICATION_SERVICE_SID);

  // Send a notification 
  service.notifications.create({
    'identity':'' + request.body.identity,
    'body':'Hello, ' + request.body.identity + '!'
  }).then(function(message) {
    console.log(message);
    response.send({
      message:'Successful sending notification'
    });
  }).catch(function(error) {
    var message = 'Failed to send notification: ' + error;
    console.log(message);
    // Send a JSON response indicating an internal server error
    response.status(500).send({
      error: error,
    });
  });
});

// Create http server and run it
var server = http.createServer(app);
var port = process.env.PORT || 3000;
server.listen(port, function() {
    console.log('Express server running on *:' + port);
});