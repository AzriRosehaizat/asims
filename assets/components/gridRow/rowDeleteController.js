application.controller('rowDeleteController', function($scope, $uibModalInstance, grid, row) {
    
    $scope.onDelete = function() {
        // Delete row
        var index = grid.appScope.gridOptions.data.indexOf(row.entity);
        grid.appScope.gridOptions.data.splice(index, 1);
        $uibModalInstance.close(row.entity);
    }
});