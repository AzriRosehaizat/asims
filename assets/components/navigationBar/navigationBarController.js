application.controller('navigationBarController', function($scope, $mdSidenav, Auth) {

  $scope.auth = Auth;

  $scope.logout = function() {
    Auth.logout();
  };

  $scope.toggleLeft = buildToggler('left');

  function buildToggler(navID) {
    return function() {
      $mdSidenav(navID)
        .toggle()
        .then(function() {
          // Do something..
        });
    };
  }
});