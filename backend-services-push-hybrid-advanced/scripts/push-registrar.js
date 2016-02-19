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
            date = date || new Date().toISOString();
            var dateStr = app.formatDate(date);
            appConsole.log(dateStr + ' : ' + message);
        };

        var onAndroidPushReceived = function (e) {
            var message = e.message;
            var dateCreated = e.payload.customData && e.payload.customData.dateCreated;
            _processPushMessage(message, dateCreated);
        };

        var onWpPushReceived = function (e) {
            if (e.type === "toast" && e.jsonContent) {
                var message = e.jsonContent["wp:Text2"] || e.jsonContent["wp:Text1"];
                // WP does not allow custom payload, hence we do not have the dateCreated
                _processPushMessage(message, null);
            }
        };

        var onIosPushReceived = function (e) {
            _processPushMessage(e.alert, e.dateCreated);
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