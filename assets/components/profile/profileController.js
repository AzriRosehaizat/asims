application.controller('profileController', function($scope, CurrentUser) {
    
    $scope.user = CurrentUser.user;
});