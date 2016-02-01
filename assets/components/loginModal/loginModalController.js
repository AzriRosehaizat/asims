application.controller('loginModalController', function($scope, $state, $mdDialog, Auth) {

    $scope.formData = {};

    $scope.submit = function() {
        Auth.login($scope.formData)
            .then(function(res) {
                $mdDialog.cancel();
                $state.go("application.root");
            }, function(err) {
                console.warn(err);
            });
    };
    
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
});