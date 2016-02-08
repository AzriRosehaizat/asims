application.controller('adminController', function($scope, $filter, users, adminService, SearchHelper, AnchorScroll) {

    $scope.gridTitle = 'Admin Page';
    $scope.users = users.data;
    $scope.formData = {};
    adminService.initAddForm($scope.formData);

    $scope.gridOptions = adminService.gridOptions();
    $scope.gridOptions.data = $scope.users;

    $scope.gridOptions.onRegisterApi = function(gridApi) {
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            if (row.entity.id === $scope.formData.user.id) {
                // second click on the same row
                row.isSelected = true;
                $scope.gotoElement('details');
            }
            else {
                // first click
                $scope.row = row;
                adminService.initEditForm($scope.formData, row);
            }
        });
    };

    $scope.addRow = function() {
        adminService.initAddForm($scope.formData);
        $scope.gotoElement('details');
    };

    $scope.gotoElement = function(eID) {
        AnchorScroll.scrollTo(eID);
    };

    $scope.submit = function() {
        if ($scope.formData.isEditing) {
            adminService.updateUser($scope.row, $scope.formData);
            // error handler? in service?
        }
        else {
            adminService.createUser($scope.gridOptions.data, $scope.formData);
        }
    };

    $scope.cancel = function() {
        adminService.cancel($scope.row, $scope.formData);
    };

    $scope.delete = function(ev) {
        adminService.delete(ev, $scope.gridOptions.data, $scope.formData);
    };

    $scope.lastLogin = function(row) {
        adminService.lastLogin(row);
    };
    
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