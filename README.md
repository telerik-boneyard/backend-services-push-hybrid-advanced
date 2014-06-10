This application is an advanced example of using Push Notifications provided by Telerik Backend Services in a client app that is enabled to send and receive push notifications.

### Requirements ###

   * Registration in Telerik Platform (https://platform.telerik.com/).
   * A new or existing Backend Services project in your Platform account.
   * The project must be configured for push notifications as specified in the Backend Services [documentation](http://docs.telerik.com/platform/backend-services/features/push-notifications/setup).

### Showcased features of Telerik Backend Services ###

* Users management in Telerik Backend Services.
* Enabling a device for push notifications.
* Registering of devices with a userId field.
* Creating push notifications from the client app.
* Targeting push notifications to specific users.

### Installation ###

* Log in Telerik AppBuilder and clone this repository.
* Open the `config.js` file located in the scripts folder.
* Locate the variable `app.config.everlive.apiKey` and replace its value with the API key for the configured Backend Services project.
* Locate the variable `app.androidProjectNumber` and replace it with your Google API Project Number. More details on obtaining the project number can be found [here](https://developers.google.com/console/help/#projectnumber).

### Running the sample app ###

> Receiving push notifications is not supported in the AppBuilder simulator and in the Telerik AppBuilder Companion app, but you will be able to target and send push notifications to other users. 

* Deploy the project to a device and run it. More information of how to run your hybrid app created with Telerik AppBuilder on devices can be read here: [Running Apps on Devices](http://docs.telerik.com/platform/appbuilder/testing-your-app/running-on-devices/working-with-devices).

* Authenticate to the app with an existing or new user account.
* The app will try to automatically enable the device for push notifications and register it/update its registration in Telerik Backend Services.
* Choose a specific user or just tap the "Send" button to send message to all available users. 

