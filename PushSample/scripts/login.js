(function (global) {
    'use strict';
    
    var app = global.app = global.app || {};
    
    app.loginViewModel = (function () {
        
        var $username,
            $password;
        
        var init = function () {

            $username = $('#loginUsername');
            $password = $('#loginPassword');
        };
        
        var show = function () {
            $username.val('');
            $password.val('');
        };
        
        var login = function () {

            var username = $username.val(),
                password = $password.val();
            
            app.showLoading();

            app.everlive.Users.login(username, password).then(function () {
                
                app.hideLoading();
                return app.usersModel.load();
                
            }).then(function () {
                
                app.navigateToView(app.config.views.device);
                
            }).then(null, function (err) {
                	app.hideLoading();
            		app.showError(err.message);
            	}
            );
        };
        
        return {
            init: init,
            show: show,
            login: login,
            getYear: app.getYear
        };
    }());
    
}(window));
