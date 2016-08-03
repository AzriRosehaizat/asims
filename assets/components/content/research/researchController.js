application.controller('researchController', function($scope, researches, researchService, rTabService, SearchHelper, toaster, gridService) {

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
        gridService.setMain($scope, gridApi, 'research');
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            $scope.row = row;
            $scope.tabRow = null;
            researchService.initEditForm($scope.formData, $scope.gridOptions.data, row);

            rTabService.getTabs($scope.tabs, row);
        });
    };

    $scope.addRow = function() {
        researchService.initAddForm($scope.formData, $scope.gridOptions.data);
    };

    $scope.editRow = function() {
        if ($scope.row) {
            researchService.initEditForm($scope.formData, $scope.gridOptions.data, $scope.row);
        }
        else
            toaster.info("Select a row first.");
    };

    $scope.selectTab = function(tab) {
        $scope.tab = tab;
        $scope.tabRow = null;
        if ($scope.row) $scope.addTabRow();
    };
    
    $scope.tabs.grant.gridOptions.onRegisterApi = function(gridApi) {
        gridService.set(gridApi, 'rGrant');
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            $scope.tabRow = row;
            rTabService.initEditForm($scope.formData, $scope.tab, row);
        });
    };

    $scope.tabs.staff.gridOptions.onRegisterApi = function(gridApi) {
        gridService.set(gridApi, 'rStaff');
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