application.controller('profileController', function($scope, DataService, CurrentUser, UserSchema, UserForm) {

    if ($scope.user === undefined) {
        getUser();
    }

    $scope.schema = UserSchema;
    $scope.form = UserForm;

    $scope.onSubmit = function(form) {
        // first we broadcast an event so all fields validate themselves
        $scope.$broadcast('schemaFormValidate');

        if (form.$valid) {
            DataService.updateUser($scope.user)
                .then(function(data) {
                    form.$setPristine(); // to hide buttons
                    CurrentUser.update(data); // update user saved in local storage
                }, function(err) {
                    console.warn(err);
                });
        }
    }

    $scope.onCancel = function(form) {
        getUser();
        form.$setPristine(); // to hide buttons
    };

    function getUser() {
        $scope.user = CurrentUser.user();
    };
});