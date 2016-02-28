application.controller('sectionOfferedController', function($scope, sectionOffered, sectionOfferedService, soTabService, SearchHelper) {

    $scope.gridTitle = 'Section Offered';
    $scope.sectionData = sectionOffered.data;
    $scope.formData = {};

    $scope.gridOptions = sectionOfferedService.gridOptions();
    $scope.gridOptions.data = $scope.sectionData;

    // $scope.tabs = soTabService.tabs();
    // $scope.tab = $scope.tabs.sectionOffered;

    sectionOfferedService.initAddForm($scope.formData, $scope.gridOptions.data);
    SearchHelper.init($scope.gridOptions, $scope.sectionData);

    $scope.gridOptions.onRegisterApi = function(gridApi) {
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            $scope.row = row;
            sectionOfferedService.initEditForm($scope.formData, $scope.gridOptions.data, row);

            // soTabService.getTabs($scope.tabs, row);
        });
    };

    $scope.addRow = function() {
        sectionOfferedService.initAddForm($scope.formData, $scope.gridOptions.data);
    };

    $scope.editRow = function() {
        sectionOfferedService.initEditForm($scope.formData, $scope.gridOptions.data, $scope.row);
    };

    // $scope.selectTab = function(tab) {
    //     $scope.tab = tab;
    //     $scope.addTabRow();
    // };

    // $scope.tabs.regularStaff.gridOptions.onRegisterApi = function(gridApi) {
    //     gridApi.selection.on.rowSelectionChanged($scope, function(row) {
    //         $scope.tabRow = row;
    //         soTabService.initEditForm($scope.formData, $scope.tab, row);
    //     });
    // };

    // $scope.tabs.contractStaff.gridOptions.onRegisterApi = function(gridApi) {
    //     gridApi.selection.on.rowSelectionChanged($scope, function(row) {
    //         $scope.tabRow = row;
    //         soTabService.initEditForm($scope.formData, $scope.tab, row);
    //     });
    // };

    // $scope.tabs.academicStaff.gridOptions.onRegisterApi = function(gridApi) {
    //     gridApi.selection.on.rowSelectionChanged($scope, function(row) {
    //         $scope.tabRow = row;
    //         soTabService.initEditForm($scope.formData, $scope.tab, row);
    //     });
    // };


    // $scope.addTabRow = function() {
    //     if ($scope.row)
    //         soTabService.initAddForm($scope.formData, $scope.tab, $scope.row);
    // };

    // $scope.editTabRow = function() {
    //     if ($scope.tabRow)
    //         soTabService.initEditForm($scope.formData, $scope.tab, $scope.tabRow);
    // };
});