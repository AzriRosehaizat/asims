application.controller('adminController', function($scope, DataService, RowEditor, UserSchema, UserForm) {

    $scope.gridOptions = {
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
            cellTemplate: '<button type="button" class="btn btn-primary btn-xs" ng-click="grid.appScope.editRow(grid.appScope.schema, grid.appScope.form, grid, row)"><i class="glyphicon glyphicon-edit"></i></button>',
            width: 34
        }, {
            enableColumnMenu: false,
            displayName: '',
            name: 'Delete',
            cellTemplate: '<button type="button" class="btn btn-danger btn-xs" ng-click="grid.appScope.deleteRow(grid, row)"><i class="glyphicon glyphicon-remove"></i></button>',
            width: 34
        }]
    };

    $scope.schema = UserSchema;
    $scope.form = UserForm;
    $scope.editRow = RowEditor.editRow;
    $scope.deleteRow = RowEditor.deleteRow;

    if ($scope.gridOptions.data === undefined) {
        getUsers();
    }

    function getUsers() {
        DataService.getUsers()
            .then(function(data) {
                $scope.gridOptions.data = data;
            }, function(err) {
                console.warn(err);
            });
    };
});