# Advanced Push Notifications Sample App for PhoneGap/Cordova

<a href="https://platform.telerik.com/#appbuilder/clone/https://github.com/telerik/backend-services-push-hybrid-advanced.git" target="_blank"><img src="http://docs.telerik.com/platform/samples/images/try-in-appbuilder.png" alt="Try in AppBuilder" title="Try in Telerik Platform" /></a>

<a id="top"></a>
* [Overview](#overview)
* [Screenshots](#screenshots)
* [Requirements](#requirements)
* [Configuration](#configuration)
* [Running the Sample](#running-the-sample)
* [See Also](#see-also)

# Overview

This repository contains a sample app that demonstrates how to implement more advanced features relating to push notifications. It is a hybrid app built using Telerik Platform and Cordova.

The sample app showcases these features:

* Users management
* Enabling a device for push notifications
* Registering devices with a userId field
* Creating push notifications from the client app
* Targeting push notifications to specific users

The sample app utilizes the following Telerik products and SDKs:

- [Telerik Platform Backend Services JavaScript SDK](http://docs.telerik.com/platform/backend-services/javascript/getting-started-javascript-sdk)&mdash;to connect the app to Telerik Backend Services
- [Telerik Push Plugin](https://github.com/Telerik-Verified-Plugins/PushNotification) for AppBuilder&mdash;to enable push notifications in Cordova

# Screenshots

Login Screen|Registering|Select Recipient|Receiving
---|---|---|---
![Login Screen](https://raw.githubusercontent.com/telerik/backend-services-push-hybrid-advanced/master/screenshots/android-login-screen.png)|![Registering](https://raw.githubusercontent.com/telerik/backend-services-push-hybrid-advanced/master/screenshots/android-registering.png)|![Select Recipient](https://raw.githubusercontent.com/telerik/backend-services-push-hybrid-advanced/master/screenshots/android-send-select.png)|![Receiving](https://raw.githubusercontent.com/telerik/backend-services-push-hybrid-advanced/master/screenshots/android-sending-receiving.png)

# Requirements

Before you begin, you need to ensure that you have the following:

- **An active [Telerik Platform](https://platform.telerik.com) account**
Ensure that you can log in to a Telerik Platform account. This can be a free trial account. To send a notification to a subset of users you will need a [subscription plan](http://www.telerik.com/purchase/platform) that supports "Push to Segment".
- **Telerik AppBuilder**
The sample app requires Telerik AppBuilder to run. This can be the in-browser client, the desktop client or the extension for Visual Studio.

# Configuration

The sample app comes fully functional, but to see it in action you must link it to a Telerik Platform app.


1. Click the **Run in the Platform** button to clone the repository in Telerik Platform.<br>
	A new Telerik Platform app is created for you. You can view the app source code on the Code tab.
2. Click the **Data** tab and then click **Enable Data**.
4. Click the **Settings** tab.
5. Take note of your **App ID**.
6. Go back to **Code**.
3. Open the `backend-services-push-hybrid-advanced/scripts/config.js` file.
4. Locate the `app.config.everlive.appId` variable and replace its value with the App ID that you acquired earlier.
9. If you want to run the app on Android devices, locate the `app.androidProjectNumber` variable and replace its value with your Google project number. More details on obtaining the project number can be found on [Google Developers](https://developers.google.com/console/help/new/#projectnumber).
10. Go to the **Notifications** tab and click **Enable Notifications**.
11. Enable push notifications as explained in [Enabling Push Notifications](http://docs.telerik.com/platform/backend-services/javascript/push-notifications/push-enabling).
11. Ensure that the **Notifications > Push Notifications > Permissions > Client Push Notifications** setting is set to **Allow** or **Limit**.

> It is not advisable to set **Client Push Notifications** to Allow on productions apps. For more information, see [Security of Push Notifications](http://docs.telerik.com/platform/backend-services/ios/push-notifications/push-security).

# Running the Sample

Once the app is configured, you can run it on a real device. To run it, follow the steps in the product's documentation: [Running Apps on Devices](http://docs.telerik.com/platform/appbuilder/testing-your-app/running-on-devices/working-with-devices).

> When running the app, ensure that you are building it as an app package as opposed to an AppBuilder companion app package.

> Receiving push notifications are not supported when running the app on device simulators/emulators or in the AppBuilder companion app. The rest of the app features will work though.

> Ensure that the device that you are using has Internet connectivity when running the sample.
