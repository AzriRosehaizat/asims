application.controller('rowDeleteChildController', function($scope, $uibModalInstance, DataService, row, child, url) {

    $scope.entity = angular.copy(row.entity);

    $scope.onDelete = function() {
        DataService.delete(url, child)
            .then(function(data) {
                // copy row values over
                row.entity = angular.extend(row.entity, $scope.entity);
                $uibModalInstance.close(row.entity);
            }, function(err) {
                console.warn(err);
            });
    };
});