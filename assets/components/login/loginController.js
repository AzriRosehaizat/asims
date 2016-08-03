application.controller('loginController', ['$scope', 'loginService', function($scope, loginService) {

    $scope.formData = {};

    $scope.submit = function() {
        loginService.submit($scope.formData);
    };
}]);