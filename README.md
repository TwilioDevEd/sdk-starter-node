# Twilio Starter Server Application for Node.js

This sample application contains basic examples of how to use Twilio APIs in a Node.js web 
application. Once the app is up and running, check out [the home page](http://localhost:3000)
to see which demos you can run. You'll find examples for [IP Messaging](https://www.twilio.com/ip-messaging), 
[Video](https://www.twilio.com/video), [Sync](https://www.twilio.com/sync), and more.

Let's get started!

## Configure the sample application

To run the application, you'll need to gather your Twilio account credentials and configure them
in a file named `.env`. To create this file from an example template, do the following in your
Terminal.

```bash
cp .env.example .env
```

Open `.env` in your favorite text editor and configure the following values.

### Configure account information

Every sample in the demo requires some basic credentials from your Twilio account. Configure these first.

| Config Value  | Description |
| :-------------  |:------------- |
`TWILIO_ACCOUNT_SID` | Your primary Twilio account identifier - find this [in the console here](https://www.twilio.com/console).
`TWILIO_API_KEY` | Used to authenticate - [generate one here](https://www.twilio.com/console/video/dev-tools/api-keys).
`TWILIO_API_SECRET` | Used to authenticate - [just like the above, you'll get one here](https://www.twilio.com/console/video/dev-tools/api-keys).

#### A Note on API Keys

When you generate an API key pair at the URLs above, your API Secret will only be shown once - 
make sure to save this information in a secure location, or possibly your `~/.bash_profile`.

### Configure product-specific settings

Depending on which demos you'd like to run, you'll need to configure a few more values in your 
`.env` file.

| Config Value  | Product Demo | Description |
| :-------------  |:------------- |:------------- |
`TWILIO_IPM_SERVICE_SID` | IP Messaging | Like a database for your IP Messaging data - [generate one in the console here](https://www.twilio.com/console/ip-messaging/services)
`TWILIO_CONFIGURATION_SID` | Video | Identifier for a set of config properties for your video application - [find yours here](https://www.twilio.com/console/video/profiles)
`TWILIO_SYNC_SERVICE_SID` | Sync (Preview) | Like a database for your Sync data - generate one with the curl command below.
`TWILIO_NOTIFICATION_SERVICE_SID` | Notify (Preview) | You will need to create a Notify service - [generate one here](https://www.twilio.com/console/notify/services)
`TWILIO_APN_CREDENTIAL_SID` | Notify (Preview) | Adds iOS notification ability to your app - [generate one here](https://www.twilio.com/console/notify/credentials). You'll need to provision your APN push credentials to generate this. See [this](https://www.twilio.com/docs/api/ip-messaging/guides/push-notifications-ios) guide on how to do that. (Optional)
`TWILIO_GCM_CREDENTIAL_SID`  | Notify (Preview) |Adds Android/GCM notification ability to your app - [generate one here](https://www.twilio.com/console/notify/credentials). You'll need to provision your GCM push credentials to generate this. See [this](https://www.twilio.com/docs/api/ip-messaging/guides/push-notifications-android) guide on how to do that (Optional)

#### Temporary: Generating a Sync Service Instance

During the Sync developer preview, you will need to generate Sync service
instances via API until the Console GUI is available. Using the API key pair you
generated above, generate a service instance via REST API with this curl command:

```bash
curl -X POST https://preview.twilio.com/Sync/Services \
 -d 'FriendlyName=MySyncServiceInstance' \
 -u 'SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX:your_api_secret'
```

## Setting Up The Node.js Application

Now that are application is configured, we need to install our dependencies from npm.

```bash
npm install
```

Now we should be all set! Run the application using the `node` command.

```bash
node .
```

Your application should now be running at [http://localhost:3000/](http://localhost:3000/). 

![Home Screen](https://cloud.githubusercontent.com/assets/809856/19492524/9ddad5b6-953c-11e6-8703-0bafc521d8f7.png)

Check your config values, and follow the links to the demo applications!

## License
MIT
