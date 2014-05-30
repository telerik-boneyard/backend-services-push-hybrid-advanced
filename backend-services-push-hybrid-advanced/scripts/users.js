(function (global) {
    'use strict';
    var app = global.app = global.app || {};

    app.usersModel = (function () {
        var onUserSelected = function (e) {
            var isSelected = e.dataItem.get("isSelected");
            var newState = isSelected ? false : true;
            e.dataItem.set("isSelected", newState);
        };

        // TODO - refactor this function
        var getSelectedUsersFromDataSource = function () {
            var dataSource = app.usersModel.usersDataSource;
            var data = dataSource.view();

            var checkedIds = [];

            $(data).map(function (index, item) {
                if (item.isSelected) {
                    var checkedId = item.Id;
                    checkedIds.push(checkedId);
                    item.set("isSelected", false);
                }
            });

            return checkedIds;
        };

        var handleAction = function () {
            app.navigateToView('views/mainView.html');
            app.sendPush();
        }

        return {
            usersDataSource: app.usersDataSource,
            onUserSelected: onUserSelected,
            getSelectedUsersFromDataSource: getSelectedUsersFromDataSource,
            handleAction: handleAction
        };
    }());
}(window));