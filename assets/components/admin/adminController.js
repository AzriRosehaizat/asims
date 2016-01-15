// To create a controller that uses ui-grid,
// copy and paste this code except updateRole().
// Then, change $scope.girdOptions.columnDefs and getUsers().

application.controller('adminController', function($scope, DataService, RowEditor, UserSchema, AddUserForm, EditUserForm) {

    $scope.gridOptions = {
        multiSelect: false,
        enableRowHeaderSelection: false,
        enableExpandableRowHeader: false,
        expandableRowTemplate: '/components/gridRow/expandableRow.html',
        expandableRowHeight: 27,

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
        getUsers();
    }

    $scope.gridOptions.onRegisterApi = function(gridApi) {
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            $scope.row = row;
            // open/close expandable row
            row.isExpanded = !row.isExpanded;
            if (row.isExpanded) {
                row.isSelected = true;
                // close the last expanded row
                if (angular.isObject($scope.lastRow) && row.uid !== $scope.lastRow.uid)
                    $scope.lastRow.isExpanded = false;
                $scope.lastRow = row;
            }
        });
    };

    $scope.addRow = function() {
        RowEditor.addRow(UserSchema, AddUserForm, '/user/create/')
            .result.then(function(data) {
                if (angular.isObject(data)) {
                    // reload grid data. better idea?
                    getUsers();
                }
            });
    };

    $scope.editRow = function() {
        RowEditor.editRow(UserSchema, EditUserForm, $scope.row)
            .result.then(function(data) {
                if (angular.isObject(data)) {
                    // I'm doing this because only role.id gets modified by the edit form
                    // role.role is updated corresponding to role.id here. or we can just run getUsers()
                    updateRole(data.role.id);
                    // close the expanded row
                    $scope.row.isExpanded = false;
                }
            });
    };

    $scope.deleteRow = function() {
        RowEditor.deleteRow($scope.row);
    };

    function getUsers() {
        DataService.getUsers()
            .then(function(data) {
                $scope.gridOptions.data = data;
            });
    }

    function updateRole(roleID) {
        var roles = ['reader', 'writer', 'admin'];
        $scope.row.entity.role.role = roles[roleID - 1];
    }
});