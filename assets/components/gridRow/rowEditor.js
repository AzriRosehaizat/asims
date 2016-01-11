application.service('rowEditor', function($uibModal) {
    return {
        editRow: function(grid, row) {
            return $uibModal.open({
                templateUrl: '/components/gridRow/editModal.html',
                controller: 'rowEditController',
                controllerAs: 'vm',
                resolve: {
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
                controller: 'rowEditController',
                controllerAs: 'vm',
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