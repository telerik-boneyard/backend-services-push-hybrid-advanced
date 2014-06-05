(function (global) {
    'use strict';
    var app = global.app = global.app || {};

    app.usersModel = (function () {
        var onUserSelected = function (e) {
            var isSelected = e.dataItem.get("isSelected");
            var newState = isSelected ? false : true;
            e.dataItem.set("isSelected", newState);
        };

        var handleSendAction = function () {
            app.navigateToView(app.config.views.main);
            app.PushSender.send();
        };

        return {
            usersDataSource: app.usersDataSource,
            onUserSelected: onUserSelected,
            handleSendAction: handleSendAction
        };
    }());
}(window));
