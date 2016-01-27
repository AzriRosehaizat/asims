application.controller('adminController', function($scope, $http, users, _, moment, ModalLoader, AnchorScroll, UserSchema, AddUserForm, EditUserForm) {

    /* Initialization */

    $scope.schema = UserSchema;
    initAddForm();

    $scope.gridOptions = {
        data: users.data,
        multiSelect: false,
        enableRowHeaderSelection: false,
        enableHorizontalScrollbar: 0,
        columnDefs: [{
            name: 'Username',
            field: 'username'
        }, {
            name: 'First name',
            field: 'firstName'
        }, {
            name: 'Last name',
            field: 'lastName'
        }, {
            name: 'Email',
            field: 'email'
        }, {
            name: 'Role',
            field: 'role.role'
        }, {
            name: 'Last login',
            cellTemplate: '<div class="ui-grid-cell-contents">{{grid.appScope.showLastLogin(row)}}</div>'
        }]
    };

    /* Generic functions: need minor tweaks for another view */

    $scope.gridOptions.onRegisterApi = function(gridApi) {
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            if (row.entity.id === $scope.model.id) {
                row.isSelected = true;
                $scope.gotoElement('details');
            }
            else {
                $scope.row = row;
                initEditForm(row);
            }
        });
    };

    $scope.addRow = function() {
        initAddForm();
        // open the form
        $scope.model.switch = true;
        $scope.gotoElement('details');
    };

    $scope.onSubmit = function(form) {
        $scope.$broadcast('schemaFormValidate');

        if (form.$valid) {
            if ($scope.form === EditUserForm) {
                updateUser();
            }
            else if ($scope.form === AddUserForm) {
                createUser();
            }
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

    $scope.gotoElement = function(eID) {
        AnchorScroll.scrollTo(eID);
    };

    function initAddForm() {
        $scope.detailsTitle = 'Add a user';
        $scope.btnTitle = 'Add';
        $scope.form = AddUserForm;
        $scope.model = {};
    }

    function initEditForm(row) {
        $scope.detailsTitle = 'Edit a user';
        $scope.btnTitle = 'Edit';
        $scope.form = EditUserForm;
        $scope.model = angular.copy(row.entity);
        $scope.model.switch = false;
    }

    /* adminController specific functions */

    $scope.showLastLogin = function(row) {
        var lastLogin = _.findLast(row.entity.attempts, function(attempt) {
            return attempt.successful === true;
        });
        return moment(lastLogin.createdAt).format('MMM Do YYYY, HH:mm');
    };

    function updateUser() {
        $http.put('/user/update/', $scope.model)
            .then(function(res) {
                angular.merge($scope.row.entity, res.data);
                $scope.model.switch = false;
            }, function(err) {
                console.warn(err);
            });
    }

    function createUser() {
        $http.post('/user/create/', $scope.model)
            .then(function(res) {
                $scope.gridOptions.data.push(res.data);
                $scope.model.switch = false;
            }, function(err) {
                console.warn(err);
            });
    }
});