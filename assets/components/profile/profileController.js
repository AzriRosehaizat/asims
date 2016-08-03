application.controller('profileController', ['$scope', '_', 'user', 'profileService', function($scope, _, user, profileService) {
    
    $scope.user = user.data;
    $scope.formData = {};
    profileService.initEditForm($scope.formData, $scope.user);

    $scope.submit = function() {
        profileService.updateUser($scope.user, $scope.formData);
    };

    $scope.cancel = function() {
        profileService.cancel($scope.formData, $scope.user);
    };
}]);