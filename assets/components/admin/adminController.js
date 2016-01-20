application.controller('adminController', function($scope, users, DataService, RowEditor, UserSchema, AddUserForm, EditUserForm) {

    $scope.title = "Edit a user";
    $scope.schema = UserSchema;
    $scope.form = EditUserForm;

    $scope.gridOptions = {
        multiSelect: false,
        enableRowHeaderSelection: false,

        columnDefs: [{
            name: 'Status',
            cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex) {
                if (angular.isObject(row.entity.auth)) {
                    return 'glyphicon glyphicon-ok text-center';
                }
                else {
                    return 'glyphicon glyphicon-remove text-center';
                }
            },
            width: 80
        }, {
            name: 'Name',
            field: 'username'
        }, {
            name: 'Email',
            field: 'email'
        }, {
            name: 'Role',
            field: 'role.role'
        }]
    };

    $scope.gridOptions.onRegisterApi = function(gridApi) {
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            $scope.row = row;
            // copy the row for details view
            $scope.model = angular.copy(row.entity);
            // to toggle details form
            $scope.model.switch = false;
        });
    };

    if (!angular.isObject($scope.gridOptions.data)) {
        $scope.gridOptions.data = users;
    }

    $scope.addRow = function() {
        RowEditor.addRow(UserSchema, AddUserForm, '/user/create/')
            .result.then(function(data) {
                if (angular.isObject(data)) {
                    // reload grid data. better idea?
                    $scope.gridOptions.data = users;
                }
            });
    };

    // $scope.disableRow = function() {
    //     RowEditor.deleteChildInRow($scope.row, $scope.row.entity.auth.id, '/auth/');
    // };

    // $scope.deleteRow = function() {
    //     RowEditor.deleteRow($scope.row, '/user/');
    // };

    $scope.onSubmit = function(form) {
        delete($scope.model.switch);
        $scope.$broadcast('schemaFormValidate');
        
        if (form.$valid) {
            DataService.put('/user/update/', $scope.model)
                .then(function(data) {
                    angular.extend($scope.row.entity, $scope.model);
                    // I'm doing this because only role.id gets modified by the edit form
                    // role.role is updated corresponding to role.id here. or we can just run getUsers()
                    updateRole(data.role.id);
                }, function(err) {
                    console.warn(err);
                });
        }
    };
    
    $scope.delete = function() {
        console.log("Deleted!");
    };

    $scope.cancel = function() {
        angular.extend($scope.model, $scope.row.entity);
        $scope.model.switch = false;
    };

    function updateRole(roleID) {
        var roles = ['reader', 'writer', 'admin'];
        $scope.row.entity.role.role = roles[roleID - 1];
    }
});