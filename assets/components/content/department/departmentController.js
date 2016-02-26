application.controller('departmentController', function($scope, departments, departmentService, dTabService, SearchHelper) {

    $scope.gridTitle = 'Department';
    $scope.department = departments.data;
    $scope.formData = {};

    $scope.gridOptions = departmentService.gridOptions();
    $scope.gridOptions.data = $scope.department;

    $scope.tabs = dTabService.tabs();
    $scope.tab = $scope.tabs.course;

    departmentService.initAddForm($scope.formData, $scope.gridOptions.data);
    SearchHelper.init($scope.gridOptions, $scope.department);

    $scope.gridOptions.onRegisterApi = function(gridApi) {
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            $scope.row = row;
            departmentService.initEditForm($scope.formData, $scope.gridOptions.data, row);
        
            // dTabService.getTabs($scope.tabs, row);
        });
    };

    $scope.addRow = function() {
        departmentService.initAddForm($scope.formData, $scope.gridOptions.data);
    };

    $scope.editRow = function() {
        departmentService.initEditForm($scope.formData, $scope.gridOptions.data, $scope.row);
    };
});