application.factory('RowEditor', function($uibModal) {
    return {
        editRow: function(schema, form, row) {
            return $uibModal.open({
                templateUrl: '/components/gridRow/editModal.html',
                controller: 'rowEditController',
                resolve: {
                    schema: function() {
                        return schema;
                    },
                    form: function() {
                        return form;
                    },
                    row: function() {
                        return row;
                    }
                }
            });
        },
        deleteRow: function(row) {
            return $uibModal.open({
                templateUrl: '/components/gridRow/deleteModal.html',
                controller: 'rowDeleteController',
                resolve: {
                    row: function() {
                        return row;
                    }
                }
            });
        }
    };
});