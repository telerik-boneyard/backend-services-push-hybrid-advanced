(function (global) {
    'use strict';

    var app = global.app = global.app || {};

    app.sendPush = function () {
        var recipients = app.getSelectedUsersFromDataSource();
        var currentUsername = app.currentUserUsername.get('username');

        var notificationObject = app.constructNotification(currentUsername, recipients);

        appConsole.log("Sending push message...");
        
        app.everlive.push.notifications.create(notificationObject, function (data) {
            var createdAt = app.formatDate(data.result.CreatedAt);
            appConsole.log("Notification created at: " + createdAt);
        }, function (err) {
            appConsole.log("Failed to create push notification: " + err.message, true);
        });
    };
}(window));