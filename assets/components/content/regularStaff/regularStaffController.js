application.controller('regularStaffController', function($scope, $filter, staffs, regularStaffService, SearchHelper) {

    $scope.gridTitle = 'Regular Staff';
    $scope.rStaff = staffs.data;
    $scope.formData = {};

    $scope.gridOptions = regularStaffService.gridOptions();
    $scope.gridOptions.data = $scope.rStaff;
    $scope.tabs = regularStaffService.tabs();
    
    regularStaffService.initAddForm($scope.formData, $scope.gridOptions.data);
    SearchHelper.init($scope.gridOptions, $scope.rStaff);

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
});