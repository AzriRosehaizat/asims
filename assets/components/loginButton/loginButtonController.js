application.controller('loginButtonController', function($scope, loginModalService) {
    $scope.openLoginModal = function() {
        loginModalService.open();
    };
});