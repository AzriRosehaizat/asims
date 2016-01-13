application.controller('rowDeleteController', function($scope, $uibModalInstance, DataService, grid, row) {

    $scope.onDelete = function() {
        DataService.deleteUser(row.entity.id)
            .then(function(data) {
                // delete row
                var index = grid.appScope.gridOptions.data.indexOf(row.entity);
                grid.appScope.gridOptions.data.splice(index, 1);
                $uibModalInstance.close(row.entity);
            }, function(err) {
                console.warn(err);
            });
    };
});