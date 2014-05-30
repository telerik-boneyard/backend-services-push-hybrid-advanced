(function (global) {
    'use strict';
    
    var app = global.app = global.app || {};
    
    app.MainViewModel = (function () {
        var init = function () {
            // Do something on initialization
        };
        
        var afterShow = function () {
            // TODO enable the notifications here
           // app.enablePushNotifications();

        };
        
        var choose = function () {
                app.navigateToView(app.config.views.users);
        };
        
        return {
            init : init,
            afterShow : afterShow,
            choose: choose
        }
    }());
}(window));
