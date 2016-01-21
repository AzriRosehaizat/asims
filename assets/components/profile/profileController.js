application.controller('profileController', function($scope, user, DataService, UserSchema, ProfileForm) {

    $scope.schema = UserSchema;
    $scope.form = ProfileForm;
    
    $scope.user = user;
    $scope.model = angular.copy($scope.user);

    $scope.onSubmit = function(form) {
        $scope.$broadcast('schemaFormValidate');

        if (form.$valid) {
            DataService.put('/user/update/', $scope.model)
                .then(function(data) {
                    angular.extend($scope.user, $scope.model);
                    $scope.model.switch = false;
                }, function(err) {
                    console.warn(err);
                });
        }
    };
    
    $scope.cancel = function() {
        angular.extend($scope.model, $scope.user);
        $scope.model.switch = false;
    };
});