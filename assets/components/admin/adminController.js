// To create a controller that uses ui-grid,
// copy and paste this code except updateRole().
// Then, change $scope.girdOptions.columnDefs and getUsers().

application.controller('adminController', function($scope, DataService, RowEditor, UserSchema, UserForm) {

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
        // listen for a selected row.
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            $scope.row = row;
            // open/close expandable row.
            row.isExpanded = !row.isExpanded;
            if (row.isExpanded) {
                // close other rows.
                angular.forEach(row.grid.rows, function(value, key) {
                   if (value.isExpanded && value.uid !== row.uid) {
                       value.isExpanded = false;
                   }
                });
            }
        });
    };

    $scope.editRow = function() {
        var modalInstance = RowEditor.editRow(UserSchema, UserForm, $scope.row);
        // I'm doing this because only role.id gets modified by the edit form.
        // role.role is updated corresponding to role.id here.
        modalInstance.result.then(function(data) {
            if (angular.isObject(data))
                updateRole(data.role.id);
        }, function(err) {
            console.warn(err);
        });
    };

    $scope.deleteRow = function() {
        RowEditor.deleteRow($scope.row);
    };

    function getUsers() {
        DataService.getUsers()
            .then(function(data) {
                $scope.gridOptions.data = data;
            }, function(err) {
                console.warn(err);
            });
    }

    function updateRole(roleID) {
        var roles = ['reader', 'writer', 'admin'];
        $scope.row.entity.role.role = roles[roleID - 1];
    }
});