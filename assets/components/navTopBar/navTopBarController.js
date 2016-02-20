application.controller('navTopBarController', function($scope, $mdSidenav, user, Auth, SearchHelper) {

  $scope.user = user.data;
  $scope.auth = Auth;
  
  $scope.logout = function() {
    Auth.logout();
  };
  
  $scope.search = {};
  SearchHelper.setSearch($scope.search);

  $scope.update = function(searchData) {
    SearchHelper.setInput(searchData);
  };

  $scope.toggleLeft = buildToggler('left');

  function buildToggler(navID) {
    return function() {
      $mdSidenav(navID).toggle();
    };
  }
});