application.controller('navTopBarController', function($scope, $mdSidenav, user, Auth, SearchHelper) {

  $scope.user = user.data;
  $scope.auth = Auth;

  $scope.logout = function() {
    Auth.logout();
  };
  
  $scope.update = function(search) {
    SearchHelper.search = search;
  };

  $scope.toggleLeft = buildToggler('left');

  function buildToggler(navID) {
    return function() {
      $mdSidenav(navID).toggle();
    };
  }
});