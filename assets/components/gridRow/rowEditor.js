application.factory('RowEditor', function($uibModal) {
    return {
        editRow: function(schema, form, grid, row) {
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
                    grid: function() {
                        return grid;
                    },
                    row: function() {
                        return row;
                    }
                }
            });
        },
        deleteRow: function(grid, row) {
            return $uibModal.open({
                templateUrl: '/components/gridRow/deleteModal.html',
                controller: 'rowDeleteController',
                resolve: {
                    grid: function() {
                        return grid;
                    },
                    row: function() {
                        return row;
                    }
                }
            });
        }
    };
});