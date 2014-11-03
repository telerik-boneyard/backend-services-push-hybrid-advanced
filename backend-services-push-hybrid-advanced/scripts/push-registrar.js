(function (global) {
    'use strict';

    var app = global.app = global.app || {};

    app.PushRegistrar = (function () {
        var _onDeviceIsSuccessfullyRegistered = function () {
            appConsole.log("Your device is successfully registered in Backend Services.");
            appConsole.log("You can receive push notifications.");
        };

        var _onPushErrorOccurred = function (message) {
            appConsole.log("Error: " + message, true);
        };

        var _processPushMessage = function (message, date) {
            appConsole.log(date + " : " + message);
        };

        var onAndroidPushReceived = function (e) {
            var message = e.message;
            var dateCreated = app.formatDate(e.payload.customData.dateCreated);

            _processPushMessage(message, dateCreated);
        };

        var onWpPushReceived = function (e) {
            if (e.type === "toast" && e.jsonContent) {
                var message = e.jsonContent["wp:Text2"];
                _processPushMessage(message, new Date());
            }
        };

        var onIosPushReceived = function (e) {
            var message = e.alert;
            var dateCreated = app.formatDate(e.dateCreated);

            _processPushMessage(message, dateCreated);
        };

        var pushSettings = {
            android: {
                projectNumber: app.androidProjectNumber
            },
            iOS: {
                badge: "true",
                sound: "true",
                alert: "true"
            },
            wp8: {
                channelName: "EverlivePushChannel"
            },
            notificationCallbackWP8: onWpPushReceived,
            notificationCallbackAndroid: onAndroidPushReceived,
            notificationCallbackIOS: onIosPushReceived
        };

        var enablePushNotifications = function () {
            var devicePlatform = device.platform; // get the device platform from the Cordova Device API
            appConsole.log("Initializing push notifications for " + devicePlatform + '...');

            pushSettings.customParameters = {
                "LastLoginDate": new Date()
            };

            app.everlive.push.register(pushSettings)
                .then(
                function (initResult) {
                    _onDeviceIsSuccessfullyRegistered();
                },
                function (err) {
                    _onPushErrorOccurred(err.message);
                });
        };
        return {
            enablePushNotifications : enablePushNotifications
        }
    })();
})(window);