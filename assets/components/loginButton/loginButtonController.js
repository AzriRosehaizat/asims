application.controller('loginButtonController', function($scope, loginModalService) {
    $scope.openLoginModal = function(ev) {
        loginModalService.open(ev);
    };
});