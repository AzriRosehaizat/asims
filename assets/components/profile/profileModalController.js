application.controller('profileModalController', function($scope, $uibModalInstance, user, DataService, UserSchema, ProfileForm) {

    $scope.user = angular.copy(user);
    $scope.schema = UserSchema;
    $scope.form = ProfileForm;

    $scope.onSubmit = function(form) {
        // first we broadcast an event so all fields validate themselves
        $scope.$broadcast('schemaFormValidate');

        if (form.$valid) {
            DataService.updateUser($scope.user)
                .then(function(data) {
                    user = angular.extend(user, $scope.user);
                    $uibModalInstance.close(user);
                }, function(err) {
                    console.warn(err);
                });
        }
    };
});