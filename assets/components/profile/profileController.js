application.controller('profileController', function($scope, $http, $uibModal, CurrentUser, UserSchema, ProfileForm) {

    $scope.title = "Profile";
    $scope.schema = UserSchema;
    $scope.form = ProfileForm;

    if (!angular.isObject($scope.user)) {
        getUser();
    }

    function getUser() {
        CurrentUser.getUser()
            .then(function(data) {
                $scope.user = data;
                $scope.model = angular.copy($scope.user);
                $scope.model.switch = false;
            }, function(err) {
                console.warn(err);
            });
    }

    $scope.onSubmit = function(form) {
        delete($scope.model.switch);
        $scope.$broadcast('schemaFormValidate');

        if (form.$valid) {
            $http.put('/user/update/', $scope.model)
                .then(function(res) {
                    $scope.user = angular.extend($scope.user, $scope.model);
                    $scope.model.switch = false;
                }, function(err) {
                    console.warn(err);
                });
        }
    };

    $scope.delete = function() {
        console.log("Deleted!");
    };

    $scope.cancel = function() {
        $scope.model = angular.extend($scope.model, $scope.user);
        $scope.model.switch = false;
    };
});