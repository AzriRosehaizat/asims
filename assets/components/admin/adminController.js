application.controller('adminController', function($scope, $http, rowEditor) {
    
    $scope.gridOptions = {
        enableRowSelection: true,
        columnDefs: [{
            name: 'Name',
            field: 'username'
        }, {
            name: 'Email',
            field: 'email'
        }, {
            enableColumnMenu: false,
            displayName: '',
            name: 'Edit',
            cellTemplate: '<button type="button" class="btn btn-primary btn-xs" ng-click="grid.appScope.editRow(grid, row)"><i class="glyphicon glyphicon-edit"></i></button>',
            width: 34
        }, {
            enableColumnMenu: false,
            displayName: '',
            name: 'Delete',
            cellTemplate: '<button type="button" class="btn btn-danger btn-xs" ng-click="grid.appScope.deleteRow(grid, row)"><i class="glyphicon glyphicon-remove"></i></button>',
            width: 34
        }]
    };
    
    $scope.editRow = rowEditor.editRow;
    $scope.deleteRow = rowEditor.deleteRow;

    $http.get('/user')
        .success(function(data) {
            $scope.gridOptions.data = data;
        })
        .error(function(err) {
            if (err) {

            }
        });

});