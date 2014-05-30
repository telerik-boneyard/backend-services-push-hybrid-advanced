(function (global) {
    'use strict';

    var app = global.app = global.app || {};

    app.MainViewModel = (function () {
        var events = {
            init: function () {
                // Do something on initialization
            },

            afterShow: function () {
                // initializing the notifications in this event
                // app.enablePushNotifications();

            }
        }

        return events;
    }());

}(window));
