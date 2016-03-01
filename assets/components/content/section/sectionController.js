application.controller('sectionController', function($scope, section, sectionService, SearchHelper) {

    $scope.gridTitle = 'Section';
    $scope.sectionData = section.data;
    $scope.formData = {};

    $scope.gridOptions = sectionService.gridOptions();
    $scope.gridOptions.data = $scope.sectionData;
    
    // If Related tabs exist
    // $scope.tabs = soTabService.tabs();
    // $scope.tab = $scope.tabs.section;

    sectionService.initAddForm($scope.formData, $scope.gridOptions.data);
    SearchHelper.init($scope.gridOptions, $scope.sectionData);

    $scope.gridOptions.onRegisterApi = function(gridApi) {
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            $scope.row = row;
            sectionService.initEditForm($scope.formData, $scope.gridOptions.data, row);
            
            // If Related tabs exist
            // soTabService.getTabs($scope.tabs, row);
        });
    };

    $scope.addRow = function() {
        sectionService.initAddForm($scope.formData, $scope.gridOptions.data);
    };

    $scope.editRow = function() {
        sectionService.initEditForm($scope.formData, $scope.gridOptions.data, $scope.row);
    };

    // Add functionality for tabs if they exist
});