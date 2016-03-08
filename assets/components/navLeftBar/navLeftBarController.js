  application.controller('navLeftBarController', [
    '$scope',
    '$log',
    '$state',
    '$timeout',
    '$location',
    'menu',
    'user',
    function($scope, $log, $state, $timeout, $location, menu, user) {

      var vm = this;
      //functions for menuLink and menuToggle
      vm.isOpen = isOpen;
      vm.toggleOpen = toggleOpen;
      vm.autoFocusContent = false;
      vm.menu = menu;
      
      // Toggle admin section by user's role
      var role = user.data.role.id;
      if (role === 3) menu.showAdmin();
      else menu.hideAdmin();

      vm.status = {
        isFirstOpen: false,
        isFirstDisabled: false
      };

      function isOpen(section) {
        return menu.isSectionSelected(section);
      }

      function toggleOpen(section) {
        menu.toggleSelectSection(section);
      }
    }
  ]);