application.controller('navRightBarController', function($scope, formService) {

    $scope.fs = formService;

    $scope.submit = function() {
        formService.submit($scope.fs.formData);
    };

    $scope.cancel = function() {
        formService.cancel($scope.fs.formData);
    };

    $scope.delete = function(ev) {
        formService.delete(ev, $scope.fs.formData);
    };
});