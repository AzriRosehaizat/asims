application.controller('adminController', function($scope, $http, CurrentUser) {

    //$scope.user = CurrentUser.user;

    $http.get('/user')
        .then(function(res) {
            $scope.gridOptions.data = res.data;
        })
        .catch(function(err) {
            if (err) {

            }
        });

    $scope.deleteRow = function(row) {
        var index = $scope.gridOptions.data.indexOf(row.entity);
        $scope.gridOptions.data.splice(index, 1);
    };

    $scope.gridOptions = {
        enableRowSelection: true,
        enableSorting: true,
        columnDefs: [{
            name: 'ID',
            field: 'id'
        }, {
            name: 'Name',
            field: 'username'
        }, {
            name: 'Email',
            field: 'email'
        }, {
            name: 'Delete',
            cellTemplate: '<button type="button" class="btn btn-danger btn-xs" ng-click="grid.appScope.deleteRow(row)"><i class="glyphicon glyphicon-remove"></i></button>'
        }]
    };

});