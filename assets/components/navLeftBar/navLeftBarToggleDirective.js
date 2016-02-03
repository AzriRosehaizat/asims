/*
 * menuToggle that shows and hides menu items that have sub-items assocaited with them
 */
application
  .directive('menuToggle', ['$timeout', function($timeout) {
    return {
      scope: {
        section: '='
      },
      // templateUrl: 'partials/menu-toggle.html',
      templateUrl: 'components/navLeftBar/partials/navLeftBarToggle.tmpl.html',
      link: function(scope, element) {
        // allows to get a handle of the parent controller
        var controller = element.parent().controller();

        scope.isOpen = function() {
          return controller.isOpen(scope.section);
        };
        scope.toggle = function() {
          controller.toggleOpen(scope.section);
        };

        var parentNode = element[0].parentNode.parentNode.parentNode;
        if (parentNode.classList.contains('parent-list-item')) {
          var heading = parentNode.querySelector('h2');
          element[0].firstChild.setAttribute('aria-describedby', heading.id);
        }
      }
    };
  }]);