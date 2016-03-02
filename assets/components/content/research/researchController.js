application.controller('researchController', function($scope, researches, researchService, rTabService, SearchHelper, toaster) {

    $scope.gridTitle = 'Research';
    $scope.researchData = researches.data;
    $scope.formData = {};

    $scope.gridOptions = researchService.gridOptions();
    $scope.gridOptions.data = $scope.researchData;
    
    $scope.tabs = rTabService.tabs();
    $scope.tab = $scope.tabs.grant;

    researchService.initAddForm($scope.formData, $scope.gridOptions.data);
    SearchHelper.init($scope.gridOptions, $scope.researchData);

    $scope.gridOptions.onRegisterApi = function(gridApi) {
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            $scope.row = row;
            researchService.initEditForm($scope.formData, $scope.gridOptions.data, row);
            
            rTabService.getTabs($scope.tabs, row);
        });
    };

    $scope.addRow = function() {
        researchService.initAddForm($scope.formData, $scope.gridOptions.data);
    };

    $scope.editRow = function() {
        researchService.initEditForm($scope.formData, $scope.gridOptions.data, $scope.row);
    };

    $scope.selectTab = function(tab) {
        $scope.tab = tab;
        $scope.tabRow = null;
        if ($scope.row) $scope.addTabRow();
    };
    
    //not sure about this
    $scope.tabs.grant.gridOptions.onRegisterApi = function(gridApi) {
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            $scope.tabRow = row;
            rTabService.initEditForm($scope.formData, $scope.tab, row);
        });
    };
    
    $scope.tabs.staff.gridOptions.onRegisterApi = function(gridApi) {
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            $scope.tabRow = row;
            rTabService.initEditForm($scope.formData, $scope.tab, row);
        });
    };
    
    $scope.addTabRow = function() {
        if ($scope.row)
            rTabService.initAddForm($scope.formData, $scope.tab, $scope.row);
        else
            toaster.info("Select a row first in the main table.");
    };

    $scope.editTabRow = function() {
        if ($scope.tabRow)
            rTabService.initEditForm($scope.formData, $scope.tab, $scope.tabRow);
        else
            toaster.info("Select a row first in the tab table.");
    };
});