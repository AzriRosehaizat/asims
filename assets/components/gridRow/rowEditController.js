application.controller('rowEditController', function($scope, $uibModalInstance, DataService, schema, form, grid, row) {

    $scope.entity = angular.copy(row.entity);
    $scope.schema = schema;
    $scope.form = form;

    $scope.onSubmit = function(form) {
        // first we broadcast an event so all fields validate themselves
        $scope.$broadcast('schemaFormValidate');

        if (form.$valid) {
            updateRole();  // update role.role because only role.id got changed
            DataService.updateUser($scope.entity)
                .then(function(data) {
                    // copy row values over
                    row.entity = angular.extend(row.entity, $scope.entity);
                    $uibModalInstance.close(row.entity);
                }, function(err) {
                    console.warn(err);
                });
        }
    };

    function updateRole() {
        switch ($scope.entity.role.id) {
            case 1:
                $scope.entity.role.role = 'reader';
                break;
            case 2:
                $scope.entity.role.role = 'writer';
                break;
            case 3:
                $scope.entity.role.role = 'admin';
                break;
        }
    }
});