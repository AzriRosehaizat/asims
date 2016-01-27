application.controller('deleteModalController', function($scope, $http, $uibModalInstance, row, url, id) {

    $scope.delete = function() {
        $http.delete(url + id)
            .then(function(res) {
                // delete row
                var index = row.grid.appScope.gridOptions.data.indexOf(row.entity);
                row.grid.appScope.gridOptions.data.splice(index, 1);
                $uibModalInstance.close(res.data);
            }, function(err) {
                console.warn(err);
            });
    };
});