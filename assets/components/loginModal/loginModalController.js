application.controller('loginModalController', function($scope, loginModalService) {
    $scope.cancel = $scope.$dismiss;
    $scope.submit = function() {
        loginModalService.submit($scope.user)
            .then(function(response) {
                $scope.$close(response);
            })
            .catch(function(error) {
                $scope.$dismiss(error);
            });
    };
});