(function (global) {
    'use strict';

    var app = global.app = global.app || {};
    
    var fixViewResize = function () {
        
        if (device.platform === 'iOS') {
            setTimeout(function() {
                $(document.body).height(window.innerHeight);
            }, 10);
        }
    };

    var onDeviceReady = function() {

        navigator.splashscreen.hide();
        
        if (!app.isKeySet(app.config.everlive.apiKey)) {
            $(app.config.views.init).hide();
            $('#pushApp').addClass('noapikey-scrn').html(app.constants.NO_API_KEY_MESSAGE);
            return;
        }
        
        fixViewResize();

        var os = kendo.support.mobileOS,
        	statusBarStyle = os.ios && os.flatVersion >= 700 ? 'black-translucent' : 'black';

        app.mobile = new kendo.mobile.Application(document.body, {
            transition: 'slide',
            statusBarStyle: statusBarStyle,
            skin: 'flat'
        });

        app.everlive = new Everlive({
            apiKey: app.config.everlive.apiKey,
            scheme: app.config.everlive.scheme
        });
    };

    document.addEventListener('deviceready', onDeviceReady, false);

    document.addEventListener('orientationchange', fixViewResize);

}(window));
