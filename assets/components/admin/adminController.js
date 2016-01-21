application.controller('adminController', function($scope, users, DataService, ModalLoader, UserSchema, AddUserForm, EditUserForm) {

    /* Initialization */

    $scope.schema = UserSchema;
    initAddForm();

    $scope.gridOptions = {
        multiSelect: false,
        enableRowHeaderSelection: false,
        columnDefs: [{
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

    if (!angular.isObject($scope.gridOptions.data)) {
        $scope.gridOptions.data = users;
    }

    $scope.gridOptions.onRegisterApi = function(gridApi) {
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            $scope.row = row;
            initEditForm(row);
        });
    };
    
    /* Generic functions: need minor tweaks for another view */

    $scope.addRow = function() {
        initAddForm();
    };

    $scope.onSubmit = function(form) {
        $scope.$broadcast('schemaFormValidate');
        
        if (form.$valid && confirmPassword($scope.model.password, $scope.model.password_confirm)) {
            DataService.put('/user/update/', $scope.model)
                .then(function(data) {
                    updateRole(data.role);
                    angular.merge($scope.row.entity, $scope.model);
                    $scope.model.switch = false;
                }, function(err) {
                    console.warn(err);
                });
        }
    };

    $scope.delete = function() {
        ModalLoader.delete($scope.row, '/user/')
            .result.then(function(data) {
                if (angular.isObject(data))
                    delete($scope.model);
            });
    };

    $scope.cancel = function() {
        if ($scope.form === AddUserForm)
            $scope.model = {};
        if ($scope.form === EditUserForm)
            angular.merge($scope.model, $scope.row.entity);
            
        $scope.model.switch = false;
    };
    
    function initAddForm() {
        $scope.form = AddUserForm;
        $scope.model = {};
    }

    function initEditForm(row) {
        $scope.form = EditUserForm;
        $scope.model = angular.copy(row.entity);
    }

    /* adminController specific functions */

    function confirmPassword(password, password_confirm) {
        if (password === password_confirm) {
            return true;
        }
        console.log("Passwords do not match!");
        return false;
    }

    function updateRole(roleId) {
        var roles = ['reader', 'writer', 'admin'];
        $scope.model.role.role = roles[roleId - 1];
    }
});