application.controller('facultyController', function($scope, faculty, facultyService, fTabService, SearchHelper, toaster) {

    $scope.gridTitle = 'Faculty';
    $scope.facultyData = faculty.data;
    $scope.formData = {};

    $scope.gridOptions = facultyService.gridOptions();
    $scope.gridOptions.data = $scope.facultyData;

    $scope.tabs = fTabService.tabs();
    $scope.tab = $scope.tabs.department;

    facultyService.initAddForm($scope.formData, $scope.gridOptions.data);
    SearchHelper.init($scope.gridOptions, $scope.facultyData);

    $scope.gridOptions.onRegisterApi = function(gridApi) {
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            $scope.row = row;
            facultyService.initEditForm($scope.formData, $scope.gridOptions.data, row);

            fTabService.getTabs($scope.tabs, row);
        });
    };

    $scope.addRow = function() {
        facultyService.initAddForm($scope.formData, $scope.gridOptions.data);
    };

    $scope.editRow = function() {
        facultyService.initEditForm($scope.formData, $scope.gridOptions.data, $scope.row);
    };

    $scope.selectTab = function(tab) {
        $scope.tab = tab;
        $scope.tabRow = null;
        // Read only
        // if ($scope.row) $scope.addTabRow();
    };

    $scope.tabs.department.gridOptions.onRegisterApi = function(gridApi) {
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            $scope.tabRow = row;
            fTabService.initEditForm($scope.formData, $scope.tab, row);
        });
    };

    $scope.addTabRow = function() {
        if ($scope.row)
            fTabService.initAddForm($scope.formData, $scope.tab, $scope.row);
        else
            toaster.info("Select a row first in the main table.");
    };

    $scope.editTabRow = function() {
        if ($scope.tabRow)
            fTabService.initEditForm($scope.formData, $scope.tab, $scope.tabRow);
        else
            toaster.info("Select a row first in the tab table.");
    };
});