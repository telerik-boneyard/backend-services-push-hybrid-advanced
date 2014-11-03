(function (global) {
    'use strict';

    var app = global.app = global.app || {};

    app.PushSender = (function () {
        var send = function () {
            var recipients = app.getSelectedUsersFromDataSource();
            var currentUsername = app.currentUserUsername.get('username');

            var notificationObject = app.PushFactory.create(currentUsername, recipients);

            appConsole.log("Sending push message...");

            app.everlive.push.send(notificationObject, function (data) {
                var createdAt = app.formatDate(data.result.CreatedAt);
                appConsole.log("Notification created at: " + createdAt);
            }, function (err) {
                appConsole.log("Failed to create push notification: " + err.message, true);
            });
        };

        return {
            send : send
        }
    })();
}(window));