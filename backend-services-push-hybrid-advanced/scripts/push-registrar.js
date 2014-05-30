(function (global) {
    var app = app = global.app || {};

    var onAndroidPushReceived = function (e) {
        var message = e.message;
        var dateCreated = kendo.toString(new Date(e.dateCreated),'u');
        
        kendoConsole.log(message + ' : ' + dateCreated);
    };

    var onIosPushReceived = function (e) {
       var message = e.alert;
       var dateCreated = kendo.toString(new Date(e.dateCreated),'G');
        
       kendoConsole.log("Push notification received:");
       kendoConsole.log(message + ' : ' + dateCreated);
    };

    var pushSettings = {
        android: {
            senderID: app.config.androidProjectNumber
        },
        iOS: {
            badge: "true",
            sound: "true",
            alert: "true"
        },
        notificationCallbackAndroid: onAndroidPushReceived,
        notificationCallbackIOS: onIosPushReceived,
    };
    // pass the cb functions here
    app.enablePushNotifications = function (success, error) {
        var everlive = app.everlive;
        
        var customDeviceParameters = {
            "LastLoginDate": new Date()
        };
        
        var currentDevice = everlive.push.currentDevice(app.constants.EMULATOR_MODE);
        
        kendoConsole.log("Initializing push notifications for " + device.platform + '...');
        currentDevice.enableNotifications(pushSettings)
            .then(
                function (initResult) {
                    kendoConsole.log("Push token received!");
                    // kendoConsole.log(initResult.token);
                    
                    return currentDevice.getRegistration();
                },
                function (err) {
                    app.hideLoading();
                    kendoConsole.log("Error : " + (err.message));
                }
        ).then(
            function (registration) {
                app.hideLoading();
                
                kendoConsole.log("Your device is already registered in Telerik Backend Services.");
                kendoConsole.log("The app will update the device registration.");
                kendoConsole.log("Updating the device registration...");
              
                everlive.push.currentDevice()
                    .updateRegistration(customDeviceParameters)
                    .then(function () {
                        kendoConsole.log("Successfully updated device registration...");
                    }, function (err) {
                        kendoConsole.log('Failed to update the device registration: ' + err.message);
                    });
            },
            function (err) {
                if (err.code === 801) {
                    // there is no such device - register it 
                    kendoConsole.log("Your device is not registered in Backend Services.");
                    currentDevice.register(customDeviceParameters).then(function (regData) {
                        kendoConsole.log("Your device was successfully registered in Backend Services.");
                        kendoConsole.log("Device Id: " + regData.Id);
                    }, function (err) {
                        kendoConsole.log("Failed to register the device: " + err.message);
                    });
                } else {
                    kendoConsole.log("Failed to retrieve the device registration!");
                }
            }
        );
    };
})(window);