application.controller('navTopBarController', function($scope, $state, $mdSidenav, user, _, Auth, SearchHelper) {

  $scope.$state = $state;
  $scope.user = user.data;
  $scope.auth = Auth;

  $scope.logout = function() {
    Auth.logout();
  };

  /* Set search string to SearchHelper service */
  $scope.search = {};
  SearchHelper.setSearch($scope.search);

  $scope.update = function(searchData) {
    SearchHelper.setInput(searchData);
  };

  /* Toggle left navigation bar */
  $scope.toggleLeft = buildToggler('left');

  function buildToggler(navID) {
    return function() {
      $mdSidenav(navID).toggle();
    };
  }
});