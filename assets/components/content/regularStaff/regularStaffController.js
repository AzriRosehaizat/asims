application.controller('regularStaffController', function($scope, staffs, regularStaffService, rsTabService, SearchHelper, toaster, gridService) {

    $scope.gridTitle = 'Regular Staff';
    $scope.rStaff = staffs.data;
    $scope.formData = {};

    $scope.gridOptions = regularStaffService.gridOptions();
    $scope.gridOptions.data = $scope.rStaff;

    $scope.tabs = rsTabService.tabs();
    $scope.tab = $scope.tabs.teachingActivity;

    regularStaffService.initAddForm($scope.formData, $scope.gridOptions.data);
    SearchHelper.init($scope.gridOptions, $scope.rStaff);
    
    $scope.gridOptions.onRegisterApi = function(gridApi) {
        gridService.setMain($scope, gridApi, 'regularStaff');
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            $scope.row = row;
            $scope.tabRow = null;
            regularStaffService.initEditForm($scope.formData, $scope.gridOptions.data, row);

            rsTabService.getTabs($scope.tabs, row);
        });
    };

    $scope.addRow = function() {
        regularStaffService.initAddForm($scope.formData, $scope.gridOptions.data);
    };

    $scope.editRow = function() {
        if ($scope.row)
            regularStaffService.initEditForm($scope.formData, $scope.gridOptions.data, $scope.row);
        else
            toaster.info("Select a row first.");
    };

    $scope.selectTab = function(tab) {
        $scope.tab = tab;
        $scope.tabRow = null;
        if ($scope.row) $scope.addTabRow();
    };

    $scope.tabs.teachingActivity.gridOptions.onRegisterApi = function(gridApi) {
        gridService.set(gridApi, 'rsTA');
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            $scope.tabRow = row;
            rsTabService.initEditForm($scope.formData, $scope.tab, row);
        });
    };

    $scope.tabs.department.gridOptions.onRegisterApi = function(gridApi) {
        gridService.set(gridApi, 'rsDepartment');
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            $scope.tabRow = row;
            rsTabService.initEditForm($scope.formData, $scope.tab, row);
        });
    };

    $scope.tabs.rank.gridOptions.onRegisterApi = function(gridApi) {
        gridService.set(gridApi, 'rsRank');
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            $scope.tabRow = row;
            rsTabService.initEditForm($scope.formData, $scope.tab, row);
        });
    };

    $scope.tabs.research.gridOptions.onRegisterApi = function(gridApi) {
        gridService.set(gridApi, 'rsResearch');
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            $scope.tabRow = row;
            rsTabService.initEditForm($scope.formData, $scope.tab, row);
        });
    };
    
    $scope.addTabRow = function() {
        if ($scope.row)
            rsTabService.initAddForm($scope.formData, $scope.tab, $scope.row);
        else
            toaster.info("Select a row first in the main table.");
    };

    $scope.editTabRow = function() {
        if ($scope.tabRow)
            rsTabService.initEditForm($scope.formData, $scope.tab, $scope.tabRow);
        else
            toaster.info("Select a row first in the tab table.");
    };
});