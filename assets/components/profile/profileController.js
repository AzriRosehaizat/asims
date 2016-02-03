application.controller('profileController', function($scope, _, user, profileService) {
    
    $scope.user = user.data;
    $scope.formData = {};
    profileService.initEditForm($scope.user, $scope.formData);

    $scope.submit = function() {
        profileService.updateUser($scope.user, $scope.formData);
    };

    $scope.cancel = function() {
        profileService.cancel($scope.formData, $scope.user);
    };
});