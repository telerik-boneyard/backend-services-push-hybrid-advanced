(function (global) {
    'use strict';
    
    var app = global.app = global.app || {};

    app.config = {
        
        everlive: {
            apiKey: '$EVERLIVE_API_KEY$', // Put your Backend Services API key here
            scheme: 'http'
        },
        
        views: {
            init: '#initView',
            noApiKey: 'views/noApiKeyView.html',
            device: 'views/deviceView.html',
            signUp: 'views/signupView.html'
        }
    };
    
    app.constants = {
        NO_API_KEY_MESSAGE: '<h3>Backend Services <strong>API Key</strong> is not set</h3><p><span>API Key</span> links the sample mobile app to a project in Telerik Backend Services.</p><p>To set the <span>API Key</span> open the <span>/scripts/app/settings.js</span> file and replace <strong>$EVERLIVE_API_KEY$</strong> with the <span>API Key</span> of your "Friends" project.</p>'
    };
    
}(window));
