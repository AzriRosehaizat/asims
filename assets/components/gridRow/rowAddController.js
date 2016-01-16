application.controller('rowAddController', function($scope, $uibModalInstance, DataService, schema, form, url) {
    
    $scope.title = 'User';
    $scope.entity = {};
    $scope.schema = schema;
    $scope.form = form;

    $scope.onSubmit = function(form) {
        // first we broadcast an event so all fields validate themselves
        $scope.$broadcast('schemaFormValidate');

        if (form.$valid) {
            DataService.post(url, $scope.entity)
                .then(function(data) {
                    $uibModalInstance.close($scope.entity);
                }, function(err) {
                    console.warn(err);
                });
        }
    };
});