application.controller('navTopBarController', function($scope, $mdSidenav, user, Auth, SearchHelper) {

  $scope.user = user.data;
  $scope.auth = Auth;
  
  $scope.search = {};
  SearchHelper.setSearch($scope.search);

  $scope.logout = function() {
    Auth.logout();
  };
  
  $scope.update = function(data) {
    SearchHelper.setInput(data);
  };

  $scope.toggleLeft = buildToggler('left');

  function buildToggler(navID) {
    return function() {
      $mdSidenav(navID).toggle();
    };
  }
});