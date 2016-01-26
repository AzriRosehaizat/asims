application.controller('profileController', function($scope, $http, user, UserSchema, ProfileForm) {
    
    $scope.user = user.data;
    $scope.model = angular.copy($scope.user);
    $scope.schema = UserSchema;
    $scope.form = ProfileForm;
    
    $scope.detailsTitle = 'Profile';
    $scope.btnTitle = 'Edit';

    $scope.onSubmit = function(form) {
        $scope.$broadcast('schemaFormValidate');

        if (form.$valid) {
            $http.put('/user/update/', $scope.model)
                .then(function(res) {
                    angular.extend($scope.user, res.data);
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