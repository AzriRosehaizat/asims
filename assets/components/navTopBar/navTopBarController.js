application.controller('navTopBarController', function($scope, $mdSidenav, user, Auth) {

  $scope.user = user.data;
  $scope.auth = Auth;

  $scope.logout = function() {
    Auth.logout();
  };

  $scope.toggleLeft = buildToggler('left');

  function buildToggler(navID) {
    return function() {
      $mdSidenav(navID).toggle();
    };
  }
});