application.controller('navigationBarController', function($scope, Auth) {
    
    $scope.auth = Auth;
    
    $scope.logout = function() {
      Auth.logout();
    };
});