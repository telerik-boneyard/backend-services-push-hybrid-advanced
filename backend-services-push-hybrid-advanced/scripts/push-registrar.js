(function (global) {
    'use strict';

    var app = global.app = global.app || {};

    app.PushRegistrar = (function () {
        var _onDeviceIsSuccessfullyInitialized = function () {
            appConsole.log("The device is succcessfully initialized for push notifications.");
            appConsole.log("Push token received!");
            appConsole.log("Verifying device registration...");
        }
        var _onDeviceIsSuccessfullyRegistered = function () {
            appConsole.log("Your device is successfully registered in Backend Services.");
            appConsole.log("You can receive push notifications.");
        };

        var _onDeviceIsAlreadyRegistered = function () {
            appConsole.log("Your device is already registered in Telerik Backend Services.");
            appConsole.log("Updating the device registration...");
        };

        var _onDeviceIsNotRegistered = function () {
            appConsole.log("Your device is not registered in Backend Services.");
            appConsole.log("Registering the device in Backend Services...");
        };

        var _onDeviceRegistrationUpdated = function () {
            appConsole.log("Successfully updated the device registration.");
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
        }

        var onIosPushReceived = function (e) {
            var message = e.alert;
            var dateCreated = app.formatDate(e.dateCreated);

            _processPushMessage(message, dateCreated);
        };

        var pushSettings = {
            android: {
                senderID: app.androidProjectNumber
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
            notificationCallbackIOS: onIosPushReceived,
        };

        var enablePushNotifications = function () {
            var devicePlatform = device.platform; // get the device platform from the Cordova Device API
            appConsole.log("Initializing push notifications for " + devicePlatform + '...');

            var currentDevice = app.everlive.push.currentDevice(app.constants.EMULATOR_MODE);

            var customDeviceParameters = {
                "LastLoginDate": new Date()
            };

            currentDevice.enableNotifications(pushSettings)
                .then(
                    function (initResult) {
                        _onDeviceIsSuccessfullyInitialized();

                        return currentDevice.getRegistration();
                    },
                    function (err) {
                        _onPushErrorOccurred(err.message);
                    }
                    ).then(
                        function (registration) {
                            _onDeviceIsAlreadyRegistered();

                            currentDevice
                                .updateRegistration(customDeviceParameters)
                                .then(function () {
                                    _onDeviceRegistrationUpdated();
                                }, function (err) {
                                    _onPushErrorOccurred(err.message);
                                });
                        },
                        function (err) {
                            if (err.code === 801) {
                                _onDeviceIsNotRegistered();

                                currentDevice.register(customDeviceParameters)
                                    .then(function (regData) {
                                        _onDeviceIsSuccessfullyRegistered();
                                    }, function (err) {
                                        _onPushErrorOccurred(err.message);
                                    });
                            }
                            else {
                                _onPushErrorOccurred(err.message);
                            }
                        }
                        );
        };
        return {
            enablePushNotifications : enablePushNotifications
        }
    })();
})(window);