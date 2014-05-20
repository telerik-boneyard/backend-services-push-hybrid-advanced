(function (global) {
    'use strict';
    
    var app = global.app = global.app || {};
    
    app.singupViewModel = (function () {

        var logout = function () {
            
			app.logout().then(navigateHome, function (err) {

                app.showError(err.message);
                app.navigateToView(app.config.views.init);
            });
        };

        return {
            logout: logout
        };

    }());

}(window));
