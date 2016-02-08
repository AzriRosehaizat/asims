application.controller('loginModalController', function($scope, loginModalService) {

    $scope.formData = {};

    $scope.submit = function() {
        loginModalService.submit($scope.formData);
    };
    
    $scope.cancel = function() {
        loginModalService.cancel();
    };
});