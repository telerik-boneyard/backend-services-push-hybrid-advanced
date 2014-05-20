(function (global) {
    'use strict';
    
    var app = global.app = global.app || {};
    
    app.singupViewModel = (function () {

        var dataSource,
            $signUpForm,
            $formFields,
            $signupBtnWrp,
            validator;

        var init = function () {

            $signUpForm = $('#signUp');
            $formFields = $signUpForm.find('input, textarea, select');
            $signupBtnWrp = $('#signupBtnWrp');
            validator = $signUpForm.kendoValidator({ validateOnBlur: false }).data('kendoValidator');

            $formFields.on('keyup keypress blur change input', function () {
                if (validator.validate()) {
                    $signupBtnWrp.removeClass('disabled');
                } else {
                    $signupBtnWrp.addClass('disabled');
                }
            });
        }

        var show = function () {

            dataSource = kendo.observable({
                Username: '',
                Password: '',
                DisplayName: '',
                Email: ''
            });
            kendo.bind($('#signup-form'), dataSource, kendo.mobile.ui);
        };

        var hide = function () {
            $signupBtnWrp.addClass('disabled');
        };
        
        var signup = function () {

            Everlive.$.Users.register(
                dataSource.Username,
                dataSource.Password,
                dataSource)
            .then(function () {
                app.showAlert("Registration successful");
                app.navigateToView(app.config.views.init);
            },
            function (err) {
                app.showError(err.message);
            });
        };

        return {
            init: init,
            show: show,
            hide: hide,
            signup: signup
        };

    }());
    
}(window));
