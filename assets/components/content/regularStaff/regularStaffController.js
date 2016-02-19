application.controller('regularStaffController', function($scope, $filter, staffs, regularStaffService, SearchHelper) {

    $scope.gridTitle = 'Regular Staff';
    $scope.rStaff = staffs.data;
    $scope.formData = {};

    $scope.gridOptions = regularStaffService.gridOptions();
    $scope.gridOptions.data = $scope.rStaff;
    $scope.tabs = regularStaffService.tabs();
    
    regularStaffService.initAddForm($scope.formData, $scope.gridOptions.data);

    $scope.gridOptions.onRegisterApi = function(gridApi) {
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            if (row.entity.academicStaffID === $scope.formData.model.academicStaffID) {
                row.isSelected = true;
            }
            else {
                regularStaffService.initEditForm($scope.formData, row);
            }

            regularStaffService.getDepartment($scope.tabs.departments, row);
            regularStaffService.getRank($scope.tabs.ranks, row);
            regularStaffService.getEmployment($scope.tabs.employment, row);

        });
    };

    $scope.addRow = function() {
        regularStaffService.initAddForm($scope.formData, $scope.gridOptions.data);
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
        $scope.gridOptions.data = $scope.rStaff;

        while (searchStr) {
            var searchArray = searchStr.split(' ');
            $scope.gridOptions.data = $filter('filter')($scope.gridOptions.data, searchArray[0], undefined);
            searchArray.shift();
            searchStr = (searchArray.length !== 0) ? searchArray.join(' ') : '';
        }
    }
});