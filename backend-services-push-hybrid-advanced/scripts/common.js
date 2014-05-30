(function (global) {
    'use strict';

    var app = global.app = global.app || {};
    
    app.showAlert = function(message, title, callback) {
        navigator.notification.alert(message, callback || function () {
        }, title, 'OK');
    };

    app.showError = function(message) {
        app.helper.showAlert(message, 'Error occured');
    };
    
    app.showLoading = function () {
        app.mobile.showLoading();
    };
    
    app.hideLoading = function () {
        app.mobile.hideLoading();
    };
    
    app.navigateToView = function (view) {
        app.mobile.navigate(view);
    };
    
    app.logout = function () {
        return app.everlive.Users.logout();
    };
    
    app.getYear = function () {
        return new Date().getFullYear();
    };
    
    app.isNullOrEmpty = function (value) {
        return typeof value === 'undefined' || value === null || value === '';
    };

    app.isKeySet = function (key) {
        var regEx = /^\$[A-Z_]+\$$/;
        return !app.isNullOrEmpty(key) && !regEx.test(key);
    };
    
    app.formatDate = function(dateString) {
        var formattedDate = kendo.toString(new Date(dateString), 'G');
        
        return formattedDate;
    }
}(window));
