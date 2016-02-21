application.controller('adminController', function($scope, users, adminService, SearchHelper) {

    $scope.gridTitle = 'Admin Page';
    $scope.users = users.data;
    $scope.formData = {};

    $scope.gridOptions = adminService.gridOptions();
    $scope.gridOptions.data = $scope.users;
    
    adminService.initAddForm($scope.formData, $scope.gridOptions.data);
    SearchHelper.init($scope.gridOptions, $scope.users);

    $scope.gridOptions.onRegisterApi = function(gridApi) {
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            if (row.entity.id === $scope.formData.model.id) {
                row.isSelected = true;
            }
            else {
                $scope.row = row;
                adminService.initEditForm($scope.formData, row);
            }
        });
    };

    $scope.addRow = function() {
        adminService.initAddForm($scope.formData, $scope.gridOptions.data);
    };
    
    $scope.editRow = function() {
        adminService.initEditForm($scope.formData, $scope.row);
    };

    $scope.lastLogin = function(row) {
        adminService.lastLogin(row);
    };
});