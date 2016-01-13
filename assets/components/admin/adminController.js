application.controller('adminController', function($scope, DataService, RowEditor, UserSchema, UserForm) {

    $scope.gridOptions = {
        columnDefs: [{
            name: 'Name',
            field: 'username'
        }, {
            name: 'Email',
            field: 'email'
        }, {
            name: 'Role',
            field: 'role.role'
        }, {
            enableColumnMenu: false,
            displayName: '',
            name: 'Edit',
            cellTemplate: '<button type="button" class="btn btn-primary btn-block" aria-label="Edit" ng-click="grid.appScope.editRow(grid.appScope.schema, grid.appScope.form, grid, row)"><i class="glyphicon glyphicon-edit"></i></button>',
            width: 35
        }, {
            enableColumnMenu: false,
            displayName: '',
            name: 'Delete',
            cellTemplate: '<button type="button" class="btn btn-danger btn-block" aria-label="Delete" ng-click="grid.appScope.deleteRow(grid, row)"><i class="glyphicon glyphicon-remove"></i></button>',
            width: 35
        }]
    };
    
    if ($scope.gridOptions.data === undefined) {
        getUsers();
    }

    $scope.schema = UserSchema;
    $scope.form = UserForm;
    $scope.editRow = RowEditor.editRow;
    $scope.deleteRow = RowEditor.deleteRow;

    function getUsers() {
        DataService.getUsers()
            .then(function(data) {
                $scope.gridOptions.data = data;
            }, function(err) {
                console.warn(err);
            });
    }
});