application.controller('loginModalController', function($scope, loginModalService) {
    $scope.cancel = $scope.$dismiss;
    $scope.submit = function() {
        loginModalService.submit($scope.user)
            .then(function(res) {
                $scope.$close(res);
            }, function(err) {
                $scope.$dismiss(err);
            });
    };
});