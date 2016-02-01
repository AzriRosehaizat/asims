application.controller('loginModalController', function($scope, $state, $uibModalInstance, Auth, LoginSchema, LoginForm) {

    $scope.schema = LoginSchema;
    $scope.form = LoginForm;
    $scope.model = {};

    $scope.onSubmit = function(form) {
        Auth.login($scope.model)
            .then(function(data) {
                $uibModalInstance.close();
                $state.go("application.root");
            }, function(err) {
                console.warn(err);
            });
    };
});