application.controller('regularStaffController', function($scope, staffs, regularStaffService, rsTabService, SearchHelper) {

    $scope.gridTitle = 'Regular Staff';
    $scope.rStaff = staffs.data;
    $scope.formData = {};

    $scope.gridOptions = regularStaffService.gridOptions();
    $scope.gridOptions.data = $scope.rStaff;
    $scope.tabs = regularStaffService.tabs();
    $scope.tabData = {};

    regularStaffService.initAddForm($scope.formData, $scope.gridOptions.data);
    SearchHelper.init($scope.gridOptions, $scope.rStaff);

    $scope.gridOptions.onRegisterApi = function(gridApi) {
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            if (row.entity.academicStaffID === $scope.formData.model.academicStaffID) {
                // Empty the form
            }
            else {
                $scope.row = row;
                regularStaffService.initEditForm($scope.formData, row);
            }
            regularStaffService.initEditForm($scope.formData, row);

            regularStaffService.getTeachingActivity($scope.tabs.teachingActivity, row);
            regularStaffService.getDepartment($scope.tabs.department, row);
            regularStaffService.getRank($scope.tabs.rank, row);
            regularStaffService.getEmployment($scope.tabs.employment, row);
        });
    };

    $scope.addRow = function() {
        regularStaffService.initAddForm($scope.formData, $scope.gridOptions.data);
    };

    $scope.editRow = function() {
        regularStaffService.initEditForm($scope.formData, $scope.row);
    };

    $scope.tabs.department.gridOptions.onRegisterApi = function(gridApi) {
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            rsTabService.initEditForm($scope.tabData, row);
        });
    };

    $scope.tabs.rank.gridOptions.onRegisterApi = function(gridApi) {
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            
        });
    };

    $scope.tabs.employment.gridOptions.onRegisterApi = function(gridApi) {
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            
        });
    };
});