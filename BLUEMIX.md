<a href="https://www.twilio.com">
  <img src="https://static0.twilio.com/marketing/bundles/marketing/img/logos/wordmark-red.svg" alt="Twilio" width="250" />
</a>

# Twilio SDK Starter Application for Node.js on IBM Bluemix
[![Build Status](https://travis-ci.org/TwilioDevEd/sdk-starter-node.svg)](https://travis-ci.org/TwilioDevEd/sdk-starter-node)

This sample project demonstrates how to use Twilio APIs in a Node.js web
application running on [IBM's Bluemix](https://www.ibm.com/cloud-computing/bluemix/).

If you are not deploying to Bluemix, see the [Main Readme](./README.md).

## A Note on API Keys

When you generate an API key pair at the URLs above, your API Secret will only be shown once -
make sure to save this information in a secure location, or possibly your `~/.bash_profile`.

## Configure the Sample App

Currently, the Sample App has only been tested on Bluemix with Programmable Chat.  Instructions should be similar for the other two.

## Building Out The Application on Bluemix

1. In IBM's Bluemix, set up a new Twilio service.
2. Enter your Account SID and Auth Token from the Console
3. Clone this branch of this repository
4. Login to Bluemix on the command line (ensure you have the [CLI installed](https://console.bluemix.net/docs/starters/install_cli.html)):
```
bluemix api https://api.ng.bluemix.net
bluemix login
```
5. Generate a Twilio [API Key and Secret Pair](https://www.twilio.com/console/video/dev-tools/api-keys)
6. Create a Chat Service in the [Programmable Chat Dashboard](https://www.twilio.com/console/chat/dashboard).
7. Set everything as an environment variables (in the Bluemix console):
```
TWILIO_API_KEY
TWILIO_API_SECRET
TWILIO_CHAT_SERVICE_ID
```
Optionally, you can also set:
```
TWILIO_SYNC_SERVICE_ID
TWILIO_NOTIFICATION_SERVICE_ID
```
8. Deploy the code:
```
bluemix app push <App Name>
```
9. Visit APP_URL/chat
10. Open a new browser to the same URL
11. Have a productive chat with yourself!

## Meta

* No warranty expressed or implied. Software is as is. Diggity.
* [MIT License](http://www.opensource.org/licenses/mit-license.html)
* Lovingly crafted by Twilio Developer Education.
