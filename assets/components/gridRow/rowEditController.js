application.controller('rowEditController', function($scope, $uibModalInstance, DataService, schema, form, grid, row) {

    $scope.entity = angular.copy(row.entity);
    $scope.schema = schema;
    $scope.form = form;

    $scope.onSubmit = function(form) {
        // first we broadcast an event so all fields validate themselves
        $scope.$broadcast('schemaFormValidate');

        if (form.$valid) {
            DataService.updateUser($scope.entity)
                .then(function(data) {
                    // copy row values over
                    row.entity = angular.extend(row.entity, $scope.entity);
                    $uibModalInstance.close(row.entity);
                }, function(err) {
                    console.warn(err);
                });
        }
    }
});