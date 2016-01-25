application.factory('RowEditor', function($uibModal) {
    return {
        addRow: function(schema, form, url) {
            return $uibModal.open({
                templateUrl: '/components/gridRow/addModal.html',
                controller: 'rowAddController',
                resolve: {
                    schema: function() {
                        return schema;
                    },
                    form: function() {
                        return form;
                    },
                    url: function() {
                        return url;
                    }
                }
            });
        },
        editRow: function(schema, form, row, url) {
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
                    },
                    url: function() {
                        return url;
                    }
                }
            });
        },
        deleteRow: function(row, url) {
            return $uibModal.open({
                templateUrl: '/components/gridRow/deleteModal.html',
                controller: 'rowDeleteController',
                resolve: {
                    row: function() {
                        return row;
                    },
                    url: function() {
                        return url;
                    }
                }
            });
        }
    };
});