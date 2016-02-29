application.controller('contractStaffController', function($scope, staffs, contractStaffService, csTabService, SearchHelper) {

    $scope.gridTitle = 'Contract Staff';
    $scope.cStaff = staffs.data;
    $scope.formData = {};

    $scope.gridOptions = contractStaffService.gridOptions();
    $scope.gridOptions.data = $scope.cStaff;

    $scope.tabs = csTabService.tabs();
    $scope.tab = $scope.tabs.teachingActivity;

    contractStaffService.initAddForm($scope.formData, $scope.gridOptions.data);
    SearchHelper.init($scope.gridOptions, $scope.cStaff);

    $scope.gridOptions.onRegisterApi = function(gridApi) {
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            $scope.row = row;
            contractStaffService.initEditForm($scope.formData, $scope.gridOptions.data, row);

            // csTabService.getTabs($scope.tabs, row);
        });
    };

    $scope.addRow = function() {
        contractStaffService.initAddForm($scope.formData, $scope.gridOptions.data);
    };

    $scope.editRow = function() {
        contractStaffService.initEditForm($scope.formData, $scope.gridOptions.data, $scope.row);
    };
});