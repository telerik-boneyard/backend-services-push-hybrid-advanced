(function (global) {
    'use strict';
    
    var app = global.app = global.app || {};
    
    app.usersModel = (function () {

        var usersData,
        	currentUser = kendo.observable({ data: null });

        var loadUsers = function () {

            return app.everlive.Users.currentUser().then(function (data) {

                //var currentUserData = data.result;
                //currentUserData.PictureUrl = app.resolveProfilePictureUrl(currentUserData.Picture);
                //currentUser.set('data', currentUserData);

                return app.everlive.Users.get();
                
            }).then(function (data) {

                usersData = new kendo.data.ObservableArray(data.result);

            }).then(null, function (err) {
                	app.showError(err.message);
            	}
            );
        };

        return {
            load: loadUsers,
            users: function () {
                return usersData;
            },
            currentUser: currentUser
        };

    }());

}(window));
