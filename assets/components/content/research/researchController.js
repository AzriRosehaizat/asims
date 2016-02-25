application.controller('researchController', function($scope, researches, researchService, rTabService, SearchHelper) {

    $scope.gridTitle = 'Research';
    $scope.research = researches.data;
    $scope.formData = {};

    $scope.gridOptions = researchService.gridOptions();
    $scope.gridOptions.data = $scope.research;

    $scope.tabs = rTabService.tabs();
    $scope.tab = $scope.tabs.grant;

    researchService.initAddForm($scope.formData, $scope.gridOptions.data);
    SearchHelper.init($scope.gridOptions, $scope.research);

    $scope.gridOptions.onRegisterApi = function(gridApi) {
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            $scope.row = row;
            researchService.initEditForm($scope.formData, $scope.gridOptions.data, row);
            
            // rTabService.getTabs($scope.tabs, row);
        });
    };

    $scope.addRow = function() {
        researchService.initAddForm($scope.formData, $scope.gridOptions.data);
    };

    $scope.editRow = function() {
        researchService.initEditForm($scope.formData, $scope.gridOptions.data, $scope.row);
    };
});