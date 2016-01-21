application.controller('deleteModalController', function($scope, $uibModalInstance, row, url, DataService) {

    $scope.delete = function() {
        DataService.delete(url, row.entity.id)
            .then(function(data) {
                // delete row
                var index = row.grid.appScope.gridOptions.data.indexOf(row.entity);
                row.grid.appScope.gridOptions.data.splice(index, 1);
                $uibModalInstance.close(data);
            }, function(err) {
                console.warn(err);
            });
    };
});