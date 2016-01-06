application.controller('profileController', function($scope, CurrentUser) {
    
    $scope.username = CurrentUser.user.username;
    $scope.email = CurrentUser.user.email;
});