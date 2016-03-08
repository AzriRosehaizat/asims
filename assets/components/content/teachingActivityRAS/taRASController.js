application.controller('taRASController', function($scope, staffs, taRASService, taRASTabService, SearchHelper, toaster) {
    
    $scope.gridTitle = 'Regular Staff';
    $scope.rStaffData = staffs.data;
    $scope.formData = {};

    $scope.gridOptions = taRASService.gridOptions();
    $scope.gridOptions.data = $scope.rStaffData;

    $scope.tabs = taRASTabService.tabs();
    $scope.tab = $scope.tabs.teachingActivity;

    taRASService.initAddForm($scope.formData, $scope.gridOptions.data);
    SearchHelper.init($scope.gridOptions, $scope.rStaffData);

    $scope.gridOptions.onRegisterApi = function(gridApi) {
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            $scope.row = row;
            $scope.tabRow = null;
            taRASService.initEditForm($scope.formData, $scope.gridOptions.data, row);

            taRASTabService.getTabs($scope.tabs, row);
        });
    };

    $scope.addRow = function() {
        taRASService.initAddForm($scope.formData, $scope.gridOptions.data);
    };

    $scope.editRow = function() {
        if ($scope.row) 
            taRASService.initEditForm($scope.formData, $scope.gridOptions.data, $scope.row);
        else
            toaster.info("Select a row first.");
    };

    $scope.selectTab = function(tab) {
        $scope.tab = tab;
        $scope.tabRow = null;
        if ($scope.row) $scope.addTabRow();
    };

    $scope.tabs.teachingActivity.gridOptions.onRegisterApi = function(gridApi) {
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            $scope.tabRow = row;
            taRASTabService.initEditForm($scope.formData, $scope.tab, row);
        });
    };

    $scope.tabs.overload.gridOptions.onRegisterApi = function(gridApi) {
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            $scope.tabRow = row;
            taRASTabService.initEditForm($scope.formData, $scope.tab, row);
        });
    };

    // $scope.tabs.FCECredit.gridOptions.onRegisterApi = function(gridApi) {
    //     gridApi.selection.on.rowSelectionChanged($scope, function(row) {
    //         $scope.tabRow = row;
    //         taRASTabService.initEditForm($scope.formData, $scope.tab, row);
    //     });
    // };

    // $scope.tabs.FCEDebit.gridOptions.onRegisterApi = function(gridApi) {
    //     gridApi.selection.on.rowSelectionChanged($scope, function(row) {
    //         $scope.tabRow = row;
    //         taRASTabService.initEditForm($scope.formData, $scope.tab, row);
    //     });
    // };
    
    // $scope.tabs.loadReduction.gridOptions.onRegisterApi = function(gridApi) {
    //     gridApi.selection.on.rowSelectionChanged($scope, function(row) {
    //         $scope.tabRow = row;
    //         taRASTabService.initEditForm($scope.formData, $scope.tab, row);
    //     });
    // };
    
    // $scope.tabs.loadIncrease.gridOptions.onRegisterApi = function(gridApi) {
    //     gridApi.selection.on.rowSelectionChanged($scope, function(row) {
    //         $scope.tabRow = row;
    //         taRASTabService.initEditForm($scope.formData, $scope.tab, row);
    //     });
    // };

    $scope.addTabRow = function() {
        if ($scope.row)
            taRASTabService.initAddForm($scope.formData, $scope.tab, $scope.row);
        else
            toaster.info("Select a row first in the main table.");
    };

    $scope.editTabRow = function() {
        if ($scope.tabRow)
            taRASTabService.initEditForm($scope.formData, $scope.tab, $scope.tabRow);
        else
            toaster.info("Select a row first in the tab table.");
    };
});