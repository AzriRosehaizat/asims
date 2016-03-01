application.controller('departmentController', function($scope, departments, departmentService, dTabService, SearchHelper, toaster) {

    $scope.gridTitle = 'Department';
    $scope.department = departments.data;
    $scope.formData = {};

    $scope.gridOptions = departmentService.gridOptions();
    $scope.gridOptions.data = $scope.department;

    $scope.tabs = dTabService.tabs();
    $scope.tab = $scope.tabs.course;

    departmentService.initAddForm($scope.formData, $scope.gridOptions.data);
    SearchHelper.init($scope.gridOptions, $scope.department);

    $scope.gridOptions.onRegisterApi = function(gridApi) {
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            $scope.row = row;
            //resets related tab selection
            $scope.tabRow = null;
            departmentService.initEditForm($scope.formData, $scope.gridOptions.data, row);
            dTabService.getTabs($scope.tabs, row);
        });
    };

    $scope.addRow = function() {
        departmentService.initAddForm($scope.formData, $scope.gridOptions.data);
    };

    $scope.editRow = function() {
        if ($scope.row)
            departmentService.initEditForm($scope.formData, $scope.gridOptions.data, $scope.row);
        else
            toaster.info("Select a row first.");
    };


    // Begin tab operations
    $scope.selectTab = function(tab) {
        $scope.tab = tab;
        $scope.tabRow = null;
        if ($scope.row) $scope.addTabRow();
    };

    $scope.tabs.course.gridOptions.onRegisterApi = function(gridApi) {
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            $scope.tabRow = row;
            dTabService.initEditForm($scope.formData, $scope.tab, row);
        });
    };
    $scope.tabs.regularStaff.gridOptions.onRegisterApi = function(gridApi) {
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            $scope.tabRow = row;
            dTabService.initEditForm($scope.formData, $scope.tab, row);
        });
    };
    $scope.tabs.contractStaff.gridOptions.onRegisterApi = function(gridApi) {
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            $scope.tabRow = row;
            dTabService.initEditForm($scope.formData, $scope.tab, row);
        });
    };
    $scope.tabs.chair.gridOptions.onRegisterApi = function(gridApi) {
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            $scope.tabRow = row;
            dTabService.initEditForm($scope.formData, $scope.tab, row);
        });
    };

    $scope.addTabRow = function() {
        if ($scope.row)
            dTabService.initAddForm($scope.formData, $scope.tab, $scope.row);
        else if ($scope.tab.title === "Regular Staff" || $scope.tab.title === "Contract Staff")
            //Temp, should use $mdDialog
            alert("Adding a staff is not allowed from this view");
        else
            toaster.info("Select a row first in the main table.");
    };

    $scope.editTabRow = function() {
        if ($scope.tabRow)
            dTabService.initEditForm($scope.formData, $scope.tab, $scope.tabRow);
        else
            toaster.info("Select a row first in the tab table.");
    };
});