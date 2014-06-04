(function (global) {
    'use strict';

    var app = global.app = global.app || {};

    app.config = {

        everlive: {
            apiKey: 'lGZ6g8a95ovHKepC', // Put your Backend Services API key here
            scheme: 'http'
        },

        views: {
            init: '#initView',
            noApiKey: 'views/noApiKeyView.html',
            signUp: 'views/signupView.html',
            users: 'views/usersView.html',
            main: 'views/mainView.html'
        }
    };

    app.androidProjectNumber = 'ANDROID_PROJECT_NUMBER';

    app.constants = {
        NO_API_KEY_MESSAGE: '<h3>Backend Services <strong>API Key</strong> is not set.</h3><p><span>API Key</span> links the sample mobile app to a project in Telerik Backend Services.</p><p>To set the <span>API Key</span> open the <span>/scripts/app/config.js</span> file and replace <strong>$EVERLIVE_API_KEY$</strong> with the <span>API Key</span> of your Backend Services project.</p>',
        EMULATOR_MODE: false
    };

}(window));