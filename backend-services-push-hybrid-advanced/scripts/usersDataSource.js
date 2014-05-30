(function (global) {
    'use strict';

    var app = global.app = global.app || {};

    app.usersDataSource = (function () {
        
        var dataModel = {
            id: Everlive.idField,
            isSelected: false,
            isSelectedClass: function () {
                return this.get('isSelected') ? "listview-selected" : ''
            }
        };
        
        var usersDataSource = new kendo.data.DataSource({
            type: 'everlive',
            transport: {
                typeName: 'Users'
            },
            schema: {
                model: dataModel
            }
        });

        return usersDataSource;
    }());

}(window));
