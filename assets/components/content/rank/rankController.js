application.controller('rankController', function($scope, ranks, rankService, SearchHelper, toaster) {
    
    $scope.gridTitle = 'Rank';
    $scope.rankData = ranks.data;
    $scope.formData = {};
    
    $scope.gridOptions = rankService.gridOptions();
    $scope.gridOptions.data = $scope.rankData;

    // If Related tabs exist
    // $scope.tabs = soTabService.tabs();
    // $scope.tab = $scope.tabs.ranks;

    rankService.initAddForm($scope.formData, $scope.gridOptions.data);
    SearchHelper.init($scope.gridOptions, $scope.rankData);

    $scope.gridOptions.onRegisterApi = function(gridApi) {
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            $scope.row = row;
            rankService.initEditForm($scope.formData, $scope.gridOptions.data, row);

            // If Related tabs exist
            // soTabService.getTabs($scope.tabs, row);
        });
    };

    $scope.addRow = function() {
        rankService.initAddForm($scope.formData, $scope.gridOptions.data);
    };

    $scope.editRow = function() {
        rankService.initEditForm($scope.formData, $scope.gridOptions.data, $scope.row);
    };
    
    // Add functionality for tabs if they exist
});