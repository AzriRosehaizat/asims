application.controller('navTopBarController', function($scope, $state, $mdSidenav, user, _, Auth, SearchHelper) {

  $scope.$state = $state;
  $scope.user = user.data;
  $scope.auth = Auth;

  $scope.logout = function() {
    Auth.logout();
  };

  /* Bind SearchHelper service */
  $scope.search = SearchHelper;

  $scope.update = function() {
    SearchHelper.search();
  };

  /* Toggle left navigation bar */
  $scope.toggleLeft = buildToggler('left');

  function buildToggler(navID) {
    return function() {
      $mdSidenav(navID).toggle();
    };
  }
});