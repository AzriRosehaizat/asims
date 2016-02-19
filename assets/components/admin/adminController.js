application.controller('adminController', function($scope, $filter, users, adminService, SearchHelper) {

    $scope.gridTitle = 'Admin Page';
    $scope.users = users.data;
    $scope.formData = {};

    $scope.gridOptions = adminService.gridOptions();
    $scope.gridOptions.data = $scope.users;
    
    adminService.initAddForm($scope.formData, $scope.gridOptions.data);

    $scope.gridOptions.onRegisterApi = function(gridApi) {
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            if (row.entity.id === $scope.formData.model.id) {
                // second click on the same row
                row.isSelected = true;
            }
            else {
                // first click
                adminService.initEditForm($scope.formData, row);
            }
        });
    };

    $scope.addRow = function() {
        adminService.initAddForm($scope.formData, $scope.gridOptions.data);
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