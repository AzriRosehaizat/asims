application.controller('contractStaffController', function($scope, staffs, contractStaffService, SearchHelper) {

    $scope.gridTitle = 'Contract Staff';
    $scope.cStaff = staffs.data;
    $scope.formData = {};

    $scope.gridOptions = contractStaffService.gridOptions();
    $scope.gridOptions.data = $scope.cStaff;
    $scope.tabs = contractStaffService.tabs();
    
    contractStaffService.initAddForm($scope.formData, $scope.gridOptions.data);
    SearchHelper.init($scope.gridOptions, $scope.cStaff);

    $scope.gridOptions.onRegisterApi = function(gridApi) {
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            if (row.entity.academicStaffID === $scope.formData.model.academicStaffID) {
                row.isSelected = true;
            }
            else {
                $scope.row = row;
                contractStaffService.initEditForm($scope.formData, row);
            }

            // contractStaffService.getDepartment($scope.tabs.departments, row);
            // contractStaffService.getRank($scope.tabs.ranks, row);
            // contractStaffService.getEmployment($scope.tabs.employment, row);
        });
    };

    $scope.addRow = function() {
        contractStaffService.initAddForm($scope.formData, $scope.gridOptions.data);
    };
    
    $scope.editRow = function() {
        contractStaffService.initEditForm($scope.formData, $scope.row);
    };
});