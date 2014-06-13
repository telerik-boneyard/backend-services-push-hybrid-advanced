(function (global) {
    'use strict';

    var app = global.app = global.app || {};

    app.PushFactory = (function () {
        var create = function (sender, recipients) {
            var filter;

            if (Array.isArray(recipients) && recipients.length > 0) {
                // filter on the userId field in each device
                filter = {
                    "User.Id": {
                        "$in": recipients
                    }
                };
            }
            // custom data object for Android and iOS
            var customData = {
                "dateCreated": new Date()
            };
			
            var pushTitle = "Backend Services Push Sample";
            var pushMessage = sender + ": " + "Hello, push notifications!";

            // constructing the payload for the notification specifically for each supported mobile platform
            // following the structure from here: http://docs.telerik.com/platform/backend-services/features/push-notifications/structure
            var androidPayload = { 
                "data": {
                    "title": pushTitle,
                    "message": pushMessage,
                    "customData": customData
                }
            };
            
            var iosPayload = {               
                "aps": {
                    "alert": pushMessage,
                    "badge": 1,
                    "sound": "default"
                },
                "customData": customData
            };
			
            var wpPayload = {
                "Toast": {
                    "Title": pushTitle,
                    "Message": pushMessage
                }
            };
            
            var notificationObject = {
                "Filter": JSON.stringify(filter),
                "Android": androidPayload,
                "IOS": iosPayload,
                "WindowsPhone": wpPayload
            };

            return notificationObject;
        }

        return {
            create: create
        }
    })();
}(window));