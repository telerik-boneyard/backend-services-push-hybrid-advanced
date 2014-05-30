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
            //  var username = $username.val(),
            //    password = $password.val();
            var username = "andy",
                password = "333333"

            app.showLoading();
			
            app.everlive.Users.login(username, password).then(function () {
                app.hideLoading();
                app.navigateToView(app.config.views.main);
            }, function(err) {
                app.hideLoading();
                app.showError(err.message);
            });
        };
        
        return {
            init: init,
            show: show,
            login: login,
            getYear: app.getYear
        };
    }());
}(window));
