(function (global) {
    'use strict';
    
    var app = global.app = global.app || {};
    
    app.loginViewModel = (function () {
        var $username,
            $password;
        
        var events = {
            init : function () {
                $username = $('#loginUsername');
                $password = $('#loginPassword');
            },
        
            show : function () {
                $username.val('');
                $password.val('');
            }   
        }
        
        var login = function () {
            var username = $username.val(),
                password = $password.val();
            
            app.showLoading();
			
            app.everlive.Users.login(username, password).then(function (data) {
                // get the username for the current user
                app.everlive.Users.currentUser(function (data) {
                    app.currentUserUsername.set('username', data.result.Username);
                }, function (err) {
                    app.showError(err.message);
                });
                
                app.hideLoading();
                app.navigateToView(app.config.views.main);
            }, function(err) {
                app.hideLoading();
                app.showError(err.message);
            });
        };
        
        return {
            events: events,
            login: login,
            getYear: app.getYear
        };
    }());
}(window));
