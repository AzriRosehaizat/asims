application.controller('leavesController', function($scope, staff, leavesService, lTabService, SearchHelper, toaster) {

    $scope.gridTitle = 'Leave';
    $scope.staffData = staff.data;
    $scope.formData = {};

    $scope.gridOptions = leavesService.gridOptions();
    $scope.gridOptions.data = $scope.staffData;

    $scope.leftTabs = lTabService.leftTabs();
    $scope.leftTab = $scope.leftTabs.leaveCredit;
    
    $scope.rightTabs = lTabService.rightTabs();
    // $scope.rightTab = $scope.rightTabs.staffLeave;

    leavesService.initAddForm($scope.formData, $scope.gridOptions.data);
    SearchHelper.init($scope.gridOptions, $scope.staffData);

    $scope.gridOptions.onRegisterApi = function(gridApi) {
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            $scope.row = row;
            //resets related tab selection
            $scope.leftTabRow = null;
            $scope.rightTabRow = null;
            leavesService.initEditForm($scope.formData, $scope.gridOptions.data, row);
            lTabService.getTabs($scope.leftTabs, $scope.rightTabs, row);
        });
    };

    $scope.addRow = function() {
        leavesService.initAddForm($scope.formData, $scope.gridOptions.data);
    };

    $scope.editRow = function() {
        if ($scope.row)
            leavesService.initEditForm($scope.formData, $scope.gridOptions.data, $scope.row);
        else
            toaster.info("Select a row first.");
    };

    // Begin left tab operations
    $scope.selectLeftTab = function(leftTab) {
        $scope.leftTab = leftTab;
        $scope.leftTabRow = null;
        if ($scope.row) $scope.addLeftTabRow();
    };
    
    $scope.leftTabs.leaveCredit.gridOptions.onRegisterApi = function(gridApi) {
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            $scope.leftTabRow = row;
            lTabService.initEditForm($scope.formData, $scope.leftTab, row);
        });
    };

    $scope.leftTabs.leaveDebit.gridOptions.onRegisterApi = function(gridApi) {
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            $scope.leftTabRow = row;
            lTabService.initEditForm($scope.formData, $scope.leftTab, row);
        });
    };

    $scope.addLeftTabRow = function() {
        if ($scope.row)
            lTabService.initAddForm($scope.formData, $scope.leftTab, $scope.row);
        else
            toaster.info("Select a row first in the main table.");
    };

    $scope.editLeftTabRow = function() {
        if ($scope.leftTabRow)
            lTabService.initEditForm($scope.formData, $scope.leftTab, $scope.leftTabRow);
        else
            toaster.info("Select a row first in the left tab table.");
    };

    // Begin right tab operations
    // $scope.selectRightTab = function(rightTab) {
    //     $scope.rightTab = rightTab;
    //     $scope.rightTabRow = null;
    //     if ($scope.row) $scope.addRightTabRow();
    // };

    // $scope.rightTabs.staffLeave.gridOptions.onRegisterApi = function(gridApi) {
    //     gridApi.selection.on.rowSelectionChanged($scope, function(row) {
    //         $scope.rightTabRow = row;
    //         lTabService.initEditForm($scope.formData, $scope.rightTab, row);
    //     });
    // };

    // $scope.addRightTabRow = function() {
    //     if ($scope.row)
    //         lTabService.initAddForm($scope.formData, $scope.rightTab, $scope.row);
    //     else
    //         toaster.info("Select a row first in the main table.");
    // };

    // $scope.editRightTabRow = function() {
    //     if ($scope.rightTabRow)
    //         lTabService.initEditForm($scope.formData, $scope.rightTab, $scope.rightTabRow);
    //     else
    //         toaster.info("Select a row first in the right tab table.");
    // };
});