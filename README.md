# Twilio Starter Server Application for Node.js

This server starter application gives you a quickstart for several Twilio products, 
including Video, Notify, IP Messaging, and Sync. You can get one or more of them up and running by
gathering the appropriate configuration values, and adding them to the configuration file. You will need your Account SID, API Key, and API Secret for all of the products, and then specific configuration values for each of the products that you want to use.

After that, you'll be ready to start building your own projects on top of this starter solution!

Note: For Notify, you will need credentials for either (or both) of Apple or Google's push notification services.

### Account Information

| Config Value  | Description |
| :-------------  |:------------- |
TWILIO_ACCOUNT_SID | Your primary Twilio account identifier - find this [in the console here](https://www.twilio.com/console).
TWILIO_API_KEY | Used to authenticate - [generate one here](https://www.twilio.com/console/video/dev-tools/api-keys).
TWILIO_API_SECRET | Used to authenticate - [just like the above, you'll get one here](https://www.twilio.com/console/video/dev-tools/api-keys).

### Optional Settings

| Product  | Config Value  | Description |
| :-------------  |:------------- |:------------- |
Video | TWILIO_CONFIGURATION_SID | Identifier for a set of config properties for your video application - [find yours here](https://www.twilio.com/console/video/profiles).
IP Messaging | TWILIO_IPM_SERVICE_SID | Like a database for your IP Messaging data - [generate one in the console here](https://www.twilio.com/console/ip-messaging/services)
Notify | TWILIO_APN_CREDENTIAL_SID | Adds iOS notification ability to your app - [generate one here](https://www.twilio.com/console/notify/credentials). You'll need to provision your APN push credentials to generate this. See [this](https://www.twilio.com/docs/api/ip-messaging/guides/push-notifications-ios) guide on how to do that. (Optional)
Notify | TWILIO_GCM_CREDENTIAL_SID | Adds Android/GCM notification ability to your app - [generate one here](https://www.twilio.com/console/notify/credentials). You'll need to provision your GCM push credentials to generate this. See [this](https://www.twilio.com/docs/api/ip-messaging/guides/push-notifications-android) guide on how to do that. (Optional)
Notify | TWILIO_NOTIFICATION_SERVICE_SID | You will need to create a Notify service - [generate one here](https://www.twilio.com/console/notify/services).
Sync | TWILIO_SYNC_SERVICE_SID | Like a database for your Sync data - generate one with the curl command below.

#### Temporary: Generating a Sync Service Instance

During the Sync developer preview, you will need to generate Sync service
instances via API until the Console GUI is available. Using the API key pair you
generated above, generate a service instance via REST API with this curl command:

```bash
curl -X POST https://preview.twilio.com/Sync/Services \
 -d 'FriendlyName=MySyncServiceInstance' \
 -u 'SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX:your_api_secret'
```

## A Note on API Keys

When you generate an API key pair at the URLs above, your API Secret will only
be shown once - make sure to save this in a secure location, 
or possibly your `~/.bash_profile`.

## Setting Up The Node.js Application

Create a configuration file for your application:

```bash
cp .env.example .env
```

Edit `.env` with the configuration parameters we gathered from above.

Next, we need to install our dependencies from npm:

```bash
npm install
```

Now we should be all set! Run the application using the `node` command.

```bash
node .
```

Your application should now be running at [http://localhost:3000/](http://localhost:3000/). 


### Video

Check out your video application at [http://localhost:3000/video](http://localhost:3000/video). 

Just enter
the name of the room you want to join and click on 'Join Room'. Then,
open another tab and join the same room. Now, you should see your own
video in both the tabs!

![screenshot of video app](https://s3.amazonaws.com/com.twilio.prod.twilio-docs/images/video2.original.png)

### IP Messaging

Your chat application should now be running at [http://localhost:3000/ipmessaging](http://localhost:3000/ipmessaging). Open this page
in a couple browsers or tabs, and start chatting!

![screenshot of chat app](https://s3.amazonaws.com/howtodocs/quickstart/ipm-browser-quickstart.png)


### Notify

When your app receives a 'registration' in the form of a POST request to the /register endpoint from a mobile client (for instance, http://localhost:3000/register), it will create a binding. A binding is the address Twilio gives your app installation. It lets our service know where to send notifications.  

To send a notification to the client run the notify script 

```bash
  node notify_send_notification IDENTITY_HERE
```

The mobile client will receive a notification with the hardcoded 'Hello {IDENTITY}' message.

That is it! Check out our REST API [docs](http://www.local.twilio.com/docs/api/notifications/rest/overview) for more information on Twilio Notifications.

### Sync

Your browser-based sync application should now be running at [http://localhost:3000/sync](http://localhost:3000/sync). Open this page
in a couple of browsers or tabs, and start syncing!


## License
MIT
