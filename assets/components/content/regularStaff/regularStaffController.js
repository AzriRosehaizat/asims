application.controller('regularStaffController', function($scope, staffs, regularStaffService, rsTabService, SearchHelper) {

    $scope.gridTitle = 'Regular Staff';
    $scope.rStaff = staffs.data;
    $scope.formData = {};

    $scope.gridOptions = regularStaffService.gridOptions();
    $scope.gridOptions.data = $scope.rStaff;
    
    $scope.tabs = rsTabService.tabs();
    $scope.tab = $scope.tabs.teachingActivity;
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
            
            rsTabService.getTabs($scope.tabs, row);
        });
    };

    $scope.addRow = function() {
        regularStaffService.initAddForm($scope.formData, $scope.gridOptions.data);
    };

    $scope.editRow = function() {
        regularStaffService.initEditForm($scope.formData, $scope.row);
    };
    
    $scope.selectTab = function(tab) {
        $scope.tab = tab;    
    };
    
    $scope.tabs.teachingActivity.gridOptions.onRegisterApi = function(gridApi) {
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            $scope.tabRow = row;
            rsTabService.initEditForm($scope.tabData, $scope.tab, row);
        });
    };

    $scope.tabs.department.gridOptions.onRegisterApi = function(gridApi) {
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            $scope.tabRow = row;
            rsTabService.initEditForm($scope.tabData, $scope.tab, row);
        });
    };

    $scope.tabs.rank.gridOptions.onRegisterApi = function(gridApi) {
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            $scope.tabRow = row;
            rsTabService.initEditForm($scope.tabData, $scope.tab, row);
        });
    };

    $scope.tabs.employment.gridOptions.onRegisterApi = function(gridApi) {
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            $scope.tabRow = row;
            rsTabService.initEditForm($scope.tabData, $scope.tab, row);
        });
    };
    
    $scope.addTabRow = function() {
        if ($scope.row) 
            rsTabService.initAddForm($scope.tabData, $scope.tab);
    };

    $scope.editTabRow = function() {
        if ($scope.tabRow) 
            rsTabService.initEditForm($scope.tabData, $scope.tab, $scope.tabRow);
    };
});