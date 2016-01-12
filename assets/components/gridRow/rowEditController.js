application.controller('rowEditController', function($scope, $uibModalInstance, schema, form, grid, row) {

    $scope.entity = angular.copy(row.entity);
    $scope.schema = schema;
    $scope.form = form;

    $scope.onSubmit = function(form) {
        // First we broadcast an event so all fields validate themselves
        $scope.$broadcast('schemaFormValidate');

        if (form.$valid) {
            // Copy row values over
            row.entity = angular.extend(row.entity, $scope.entity);
            $uibModalInstance.close(row.entity);
        }
    }
});