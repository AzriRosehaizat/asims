application.controller('sectionOfferedController', function($scope, sectionOffered, sectionOfferedService, SearchHelper) {

    $scope.gridTitle = 'Section Offered';
    $scope.sectionData = sectionOffered.data;
    $scope.formData = {};

    $scope.gridOptions = sectionOfferedService.gridOptions();
    $scope.gridOptions.data = $scope.sectionData;
    
    // If Related tabs exist
    // $scope.tabs = soTabService.tabs();
    // $scope.tab = $scope.tabs.sectionOffered;

    sectionOfferedService.initAddForm($scope.formData, $scope.gridOptions.data);
    SearchHelper.init($scope.gridOptions, $scope.sectionData);

    $scope.gridOptions.onRegisterApi = function(gridApi) {
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            $scope.row = row;
            sectionOfferedService.initEditForm($scope.formData, $scope.gridOptions.data, row);
            
            // If Related tabs exist
            // soTabService.getTabs($scope.tabs, row);
        });
    };

    $scope.addRow = function() {
        sectionOfferedService.initAddForm($scope.formData, $scope.gridOptions.data);
    };

    $scope.editRow = function() {
        sectionOfferedService.initEditForm($scope.formData, $scope.gridOptions.data, $scope.row);
    };

    // Add functionality for tabs if they exist
});