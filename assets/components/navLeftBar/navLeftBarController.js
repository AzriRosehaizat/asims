  application
    .controller('navLeftBarController', [
      '$scope',
      '$log',
      '$state',
      '$timeout',
      '$location',
      'menu',
      function($scope, $log, $state, $timeout, $location, menu) {

        var vm = this;
        //functions for menuLink and menuToggle
        vm.isOpen = isOpen;
        vm.toggleOpen = toggleOpen;
        vm.autoFocusContent = false;
        vm.menu = menu;

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