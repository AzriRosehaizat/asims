application.controller('loginModalController', function($scope, $state, $uibModalInstance, Auth) {

    $scope.submit = function() {
        Auth.login($scope.user)
            .then(function(data) {
                $uibModalInstance.close();
                $scope.userForm.$setPristine();
                $state.go("application.root");
            }, function(err) {
                console.warn(err);
            });
    };
});