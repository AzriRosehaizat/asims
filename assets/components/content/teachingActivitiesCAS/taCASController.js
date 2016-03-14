application.controller('taCASController', function($scope, staffs, taCASService, taCASTabService, SearchHelper, toaster, gridService) {

    $scope.gridTitle = 'Contract Staff';
    $scope.cStaff = staffs.data;
    $scope.formData = {};

    $scope.gridOptions = taCASService.gridOptions();
    $scope.gridOptions.data = $scope.cStaff;

    $scope.tabs = taCASTabService.tabs();
    $scope.tab = $scope.tabs.teachingActivity;

    taCASService.initAddForm($scope.formData, $scope.gridOptions.data);
    SearchHelper.init($scope.gridOptions, $scope.cStaff);

    $scope.gridOptions.onRegisterApi = function(gridApi) {
        gridService.setMain($scope, gridApi, 'taCAS');
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            $scope.row = row;
            $scope.tabRow = null;
            taCASService.initEditForm($scope.formData, $scope.gridOptions.data, row);

            taCASTabService.getTabs($scope.tabs, row);
        });
    };

    $scope.addRow = function() {
        taCASService.initAddForm($scope.formData, $scope.gridOptions.data);
    };

    $scope.editRow = function() {
        if ($scope.row)
            taCASService.initEditForm($scope.formData, $scope.gridOptions.data, $scope.row);
        else
            toaster.info("Select a row first.");
    };
    
    $scope.selectTab = function(tab) {
        $scope.tab = tab;
        $scope.tabRow = null;
        if ($scope.row) $scope.addTabRow();
    };
    
    $scope.tabs.teachingActivity.gridOptions.onRegisterApi = function(gridApi) {
        gridService.set(gridApi, 'taCASTA');
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            $scope.tabRow = row;
            taCASTabService.initEditForm($scope.formData, $scope.tab, row);
        });
    };
    
    $scope.tabs.rightToRefuse.gridOptions.onRegisterApi = function(gridApi) {
        gridService.set(gridApi, 'rtrCASTA');
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            $scope.tabRow = row;
            taCASTabService.initEditForm($scope.formData, $scope.tab, row);
        });
    };
    
    $scope.addTabRow = function() {
        if ($scope.row)
            taCASTabService.initAddForm($scope.formData, $scope.tab, $scope.row);
        else
            toaster.info("Select a row first in the main table.");
    };

    $scope.editTabRow = function() {
        if ($scope.tabRow)
            taCASTabService.initEditForm($scope.formData, $scope.tab, $scope.tabRow);
        else
            toaster.info("Select a row first in the tab table.");
    };
});