application.controller('loginController', function($scope, loginService) {

    $scope.formData = {};

    $scope.submit = function() {
        loginService.submit($scope.formData);
    };
});