application.controller('profileController', function($scope, DataService, CurrentUser, UserSchema, UserForm) {

    $scope.user = {
        id: CurrentUser.user().id,
        username: CurrentUser.user().username,
        email: CurrentUser.user().email
    };

    $scope.schema = UserSchema;
    $scope.form = UserForm;

    $scope.onSubmit = function(form) {
        // First we broadcast an event so all fields validate themselves
        $scope.$broadcast('schemaFormValidate');

        if (form.$valid) {
            DataService.updateUser($scope.user)
                .then(function(data) {
                    console.log(data);
                    CurrentUser.update(data);
                }, function(err) {
                    console.warn(err);
                });
        }
    }
});