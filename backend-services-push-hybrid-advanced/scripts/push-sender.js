(function (global) {
    'use strict';

    var app = global.app = global.app || {};

    app.sendPush = function () {
        // target the notification
        var conditions;
        var recipients = app.usersModel.getSelectedUsersFromDataSource();
		
        if (Array.isArray(recipients) && recipients.length > 0) {
            // filter on the userId field in each device
            conditions = {
                "User.Id": {
                    "$in": recipients
                }
            };
        }
		 // custom data object for Android and iOS
        var customData = {
            "dateCreated": new Date()
        };
		
        var currentUsername = app.currentUserUsername.get('username');
        var pushMessage = currentUsername + ": " + "Hello, push notifications!";

        // construct the payload for the notification
        var notificationStructure = {
            "Message": pushMessage,
            "Android": {
                "data": {
                    "title": "Backend Services Push Sample",
                    "message": pushMessage,
                    "customData": customData
                }
            },
            "IOS": {
                "aps": {
                    "alert": pushMessage,
                    "badge": 1,
                    "sound": "default"
                },
                "customData": customData
            }
        };

        var notificationObject = {
            "Filter": JSON.stringify(conditions),
            "Android": notificationStructure.Android,
            "IOS": notificationStructure.IOS
        };
        
        app.everlive.push.notifications.create(notificationObject, function (data) {
            var createdAt = app.formatDate(data.result.CreatedAt);
            kendoConsole.log("Notification created at: " + createdAt);
        }, function (err) {
            kendoConsole.log("Failed to create push notification: " + err.message, true);
        });
    };
}(window));