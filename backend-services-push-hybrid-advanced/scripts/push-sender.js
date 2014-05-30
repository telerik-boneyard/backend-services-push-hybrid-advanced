(function (global) {
    'use strict';

    var app = global.app = global.app || {};

    var customData = {
        "dateCreated": new Date()
    };

    var notificationStructure = {
        "Android": {
            "data": {
                "title": "Backend Services Push Sample",
                "message": "Hello, push notifications!",
                "customData": customData
            }
        },
        "IOS": {
            "aps": {
                "alert": "Hello, push notifications!",
                "badge": 1,
                "sound": "default"
            },
            "customData": customData
        }
    };

    app.sendPush = function () {
        var recipients = app.usersModel.getSelectedUsersFromDataSource();
        var conditions;

        if (Array.isArray(recipients) && recipients.length > 0) {
            // filter on the userId field in each device
            conditions = {
                "User.Id": {
                    "$in": recipients
                }
            };
        }

        var notificationObject = {
            "Filter": JSON.stringify(conditions),
            "Android": notificationStructure.Android,
            "IOS": notificationStructure.IOS
        };

        Everlive.$.push.notifications.create(notificationObject, function (data) {
            var createdAt = app.formatDate(data.result.CreatedAt);
            
            kendoConsole.log("Notification created at: " + createdAt);
        }, function (err) {
            kendoConsole.log("Failed to create push notification: " + err.message);
        });
    };
    
}(window));
