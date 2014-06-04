(function (global) {
    'use strict';

    var app = global.app = global.app || {};

    app.sendPush = function () {
        // target the notification
        
        kendoConsole.log("Sending push message...");
        var recipients = app.usersModel.getSelectedUsersFromDataSource();
		var currentUsername = app.currentUserUsername.get('username');
        
       var notificationObject = app.constructNotification(currentUsername, recipients);
        
        app.everlive.push.notifications.create(notificationObject, function (data) {
            var createdAt = app.formatDate(data.result.CreatedAt);
            kendoConsole.log("Notification created at: " + createdAt);
        }, function (err) {
            kendoConsole.log("Failed to create push notification: " + err.message, true);
        });
    };
}(window));