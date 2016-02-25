(function (global) {
    'use strict';

    var app = global.app = global.app || {};

    app.MainViewModel = (function () {
        var pushEnabledForUser;
        
        var events = {
             afterShow: function () {
                if ((!app.androidProjectNumber || app.androidProjectNumber === "ANDROID_PROJECT_NUMBER") && device.platform.toLowerCase() === "android") {
                    appConsole.log("Please enter an Android project number in order to receive notifications on Android device.");
                    return;
                }
                 
                var loggedInUser = app.currentUserUsername.get("username");
                 
                if (pushEnabledForUser !== loggedInUser) {
                    // initializing the push notifications
                    app.PushRegistrar.enablePushNotifications();
                    pushEnabledForUser = loggedInUser;
                }
            }
        }

        return events;
    }());
}(window));
