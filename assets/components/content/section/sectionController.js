application.controller('sectionController', 
    ['$scope', 'section', 'sectionService', 'SearchHelper', 'toaster', 'gridService',
    function($scope, section, sectionService, SearchHelper, toaster, gridService) {

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
        gridService.setMain($scope, gridApi, 'section');
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
        if ($scope.row)
            sectionService.initEditForm($scope.formData, $scope.gridOptions.data, $scope.row);
        else
            toaster.info("Select a row first.");
    };

    // Add functionality for tabs if they exist
}]);