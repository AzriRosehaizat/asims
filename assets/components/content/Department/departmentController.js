application.controller('departmentController', function($scope, departments, departmentService, SearchHelper) {

    $scope.gridTitle = 'Department';
    $scope.department = departments.data;
    $scope.formData = {};

    $scope.gridOptions = departmentService.gridOptions();
    $scope.gridOptions.data = $scope.department;
    $scope.tabs = departmentService.tabs();
    
    departmentService.initAddForm($scope.formData, $scope.gridOptions.data);
    SearchHelper.init($scope.gridOptions, $scope.department);

    $scope.gridOptions.onRegisterApi = function(gridApi) {
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            if (row.entity.departmentID === $scope.formData.model.departmentID) {
                row.isSelected = true;
            }
            else {
                $scope.row = row;
                departmentService.initEditForm($scope.formData, row);
            }

            // departmentService.getDepartment($scope.tabs.departments, row);
            // departmentService.getRank($scope.tabs.ranks, row);
            // departmentService.getEmployment($scope.tabs.employment, row);
        });
    };

    $scope.addRow = function() {
        departmentService.initAddForm($scope.formData, $scope.gridOptions.data);
    };
    
    $scope.editRow = function() {
        departmentService.initEditForm($scope.formData, $scope.row);
    };
});