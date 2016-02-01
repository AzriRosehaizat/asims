application.controller('adminController', function($scope, $http, $filter, $mdDialog, users, _, moment, SearchHelper, AnchorScroll) {

    $scope.gridTitle = 'Admin Page';
    $scope.users = users.data;
    initAddForm();
    resetPasswords();

    $scope.gridOptions = {
        data: $scope.users,
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
            if (row.entity.id === $scope.formData.id) {
                // second click on the same row
                row.isSelected = true;
                $scope.gotoElement('details');
            }
            else {
                // first click
                $scope.row = row;
                $scope.formData = _.cloneDeep(row.entity);
                $scope.isEditing = true;
                $scope.detailTitle = 'Edit a User';
            }
        });
    };

    $scope.addRow = function() {
        initAddForm();
        $scope.gotoElement('details');
    };

    $scope.submit = function() {
        if ($scope.isEditing) {
            updateUser();
        }
        else {
            createUser();
        }
    };

    $scope.delete = function(ev) {
        var confirm = $mdDialog.confirm()
            .title('You are deleting ' + $scope.formData.username)
            .textContent('Are you sure?')
            .targetEvent(ev)
            .ok('Delete')
            .cancel('Cancel');

        $mdDialog.show(confirm).then(function() {
            var index = $scope.gridOptions.data.indexOf($scope.row.entity);

            $http.delete('/user/' + $scope.formData.id)
                .then(function(res) {
                    $scope.gridOptions.data.splice(index, 1);
                    $scope.formData = {};
                }, function(err) {
                    console.warn(err);
                });
        }, function() {
            // Do something on cancel()
        });
    };

    $scope.cancel = function(form) {
        if ($scope.isEditing) {
            _.merge($scope.formData, $scope.row.entity);
            resetPasswords();
        }
        else {
            $scope.formData = {};
        }
        // remove errors
        form.$setUntouched();
    };

    $scope.gotoElement = function(eID) {
        AnchorScroll.scrollTo(eID);
    };

    /* adminController specific functions */

    $scope.showLastLogin = function(row) {
        if (row.entity.attempts) {
            var lastLogin = _.findLast(row.entity.attempts, function(attempt) {
                return attempt.successful === true;
            });
            if (lastLogin)
                return moment(lastLogin.createdAt).format('YYYY-MM-DD');
        }
    };

    function updateUser() {
        $http.put('/user/update/', $scope.formData)
            .then(function(res) {
                _.merge($scope.row.entity, res.data);
                resetPasswords();
            }, function(err) {
                console.warn(err);
            });
    }

    function createUser() {
        $http.post('/user/create/', $scope.formData)
            .then(function(res) {
                $scope.gridOptions.data.push(res.data);
                $scope.formData = {};
            }, function(err) {
                console.warn(err);
            });
    }

    function resetPasswords() {
        $scope.formData.changePassword = false;
        $scope.formData.password = '';
        $scope.formData.passwordConfirm = '';
    }

    function initAddForm() {
        $scope.formData = {};
        $scope.isEditing = false;
        $scope.detailTitle = 'Add a User';
    }

    /* Search function */

    $scope.$watch(
        function() {
            return SearchHelper.search;
        },
        function(newVal) {
            searchData(newVal);
        }
    );

    // ref: http://plnkr.co/edit/ijjzLX3jN7zWBvc5sdnQ?p=preview
    function searchData(searchStr) {
        $scope.gridOptions.data = $scope.users;

        while (searchStr) {
            var searchArray = searchStr.split(' ');
            $scope.gridOptions.data = $filter('filter')($scope.gridOptions.data, searchArray[0], undefined);
            searchArray.shift();
            searchStr = (searchArray.length !== 0) ? searchArray.join(' ') : '';
        }
    }
});