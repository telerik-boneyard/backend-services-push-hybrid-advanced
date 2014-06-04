(function (global) {
    'use strict';

    var app = global.app = global.app || {};

    app.MainViewModel = (function () {
        var isDeviceInitialized;

        var events = {
            afterShow: function () {
                if ((!app.androidProjectNumber || app.androidProjectNumber === "ANDROID_PROJECT_NUMBER") && device.platform.toLowerCase() === "android") {
                    appConsole.log('Please enter an Android project number in order to receive notifications on Android device.');
                    return;
                }
                
                if (!isDeviceInitialized) {
                    // initializing the push notifications 
                    app.enablePushNotifications();
                    isDeviceInitialized = app.everlive.push.currentDevice().isInitialized;
                } 
            }
        }

        return events;
    }());
}(window));
