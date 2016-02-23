application.controller('researchController', function($scope, researches, researchService, SearchHelper) {

    $scope.gridTitle = 'Research';
    $scope.research = researches.data;
    $scope.formData = {};

    $scope.gridOptions = researchService.gridOptions();
    $scope.gridOptions.data = $scope.research;
    $scope.tabs = researchService.tabs();
    
    researchService.initAddForm($scope.formData, $scope.gridOptions.data);
    SearchHelper.init($scope.gridOptions, $scope.research);

    $scope.gridOptions.onRegisterApi = function(gridApi) {
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            if (row.entity.researchID === $scope.formData.model.researchID) {
                row.isSelected = true;
            }
            else {
                $scope.row = row;
                researchService.initEditForm($scope.formData, row);
            }

            // researchService.getDepartment($scope.tabs.departments, row);
            // researchService.getRank($scope.tabs.ranks, row);
            // researchService.getEmployment($scope.tabs.employment, row);
        });
    };

    $scope.addRow = function() {
        researchService.initAddForm($scope.formData, $scope.gridOptions.data);
    };
    
    $scope.editRow = function() {
        researchService.initEditForm($scope.formData, $scope.row);
    };
});