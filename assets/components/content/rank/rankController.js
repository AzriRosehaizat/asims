application.controller('rankController', function($scope, ranks, rankService, SearchHelper, toaster, gridService) {

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
        gridService.setMain($scope, gridApi, 'rank');
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
        if ($scope.row)
            rankService.initEditForm($scope.formData, $scope.gridOptions.data, $scope.row);
        else
            toaster.info("Select a row first.");
    };

    // Add functionality for tabs if they exist
});