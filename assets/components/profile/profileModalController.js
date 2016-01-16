application.controller('profileModalController', function($scope, $uibModalInstance, DataService, UserSchema, ProfileForm, user, url) {

    $scope.model = angular.copy(user);
    $scope.schema = UserSchema;
    $scope.form = ProfileForm;

    $scope.onSubmit = function(form) {
        // first we broadcast an event so all fields validate themselves
        $scope.$broadcast('schemaFormValidate');

        if (form.$valid) {
            DataService.update(url, $scope.model)
                .then(function(data) {
                    user = angular.extend(user, $scope.model);
                    $uibModalInstance.close(user);
                }, function(err) {
                    console.warn(err);
                });
        }
    };
});