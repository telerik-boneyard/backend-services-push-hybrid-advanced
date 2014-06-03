(function (global) {
    'use strict';

    var app = global.app = global.app || {};

    var _onDeviceIsSuccessfullyInitialized = function () {
        kendoConsole.log("The device is succcessfully initialized for push notifications.");
        kendoConsole.log("Push token received!");
        kendoConsole.log("Verifying device registration...");
    }
    var _onDeviceIsSuccessfullyRegistered = function () {
        kendoConsole.log("Your device is successfully registered in Backend Services.");
        kendoConsole.log("You can receive push notifications");
    };

    var _onDeviceIsAlreadyRegistered = function () {
        kendoConsole.log("Your device is already registered in Telerik Backend Services.");
        kendoConsole.log("Updating the device registration...");
    };

    var _onDeviceIsNotRegistered = function () {
        kendoConsole.log("Your device is not registered in Backend Services.");
        kendoConsole.log("Registering the device in Backend Services...");
    };

    var _onDeviceRegistrationUpdated = function () {
        kendoConsole.log("Successfully updated the device registration.");
    };

    var _onPushErrorOccurred = function (message) {
        kendoConsole.log("Error: " + message, true);
    };

    var onAndroidPushReceived = function (e) {
        var message = e.message;
        var dateCreated = app.formatDate(e.payload.customData.dateCreated);

        kendoConsole.log(message + '; ' + dateCreated);
    };

    var onIosPushReceived = function (e) {
        var message = e.alert;
        var dateCreated = app.formatDate(e.dateCreated);

        kendoConsole.log(message + '; ' + dateCreated);
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
        notificationCallbackAndroid: onAndroidPushReceived,
        notificationCallbackIOS: onIosPushReceived,
    };

    app.enablePushNotifications = function () {
        var devicePlatform = device.platform; // get the device platform from the Cordova API
        kendoConsole.log("Initializing push notifications for " + devicePlatform + '...');

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

                    currentDevice.register(customDeviceParameters).then(function (regData) {
                        _onDeviceIsSuccessfullyRegistered();

                    }, function (err) {
                        _onPushErrorOccurred(err.message);
                    });
                } else {
                    _onPushErrorOccurred(err.message);
                }
            }
        );
    };
})(window);