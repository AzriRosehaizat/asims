/*
* menuToggle that shows and hides menu items that have sub-items assocaited with them
*/
application
  .run(['$templateCache', function ($templateCache) {
    $templateCache.put('partials/menuToggle.html',
      '<md-button class="md-button-toggle"\n' +
      '  ng-click="toggle()"\n' +
      '  aria-controls="docs-menu-{{section.name | nospace}}"\n' +
      '  flex layout="row"\n' +
      '  aria-expanded="{{isOpen()}}">\n' +
      '  {{section.name}}\n' +
      '  <span aria-hidden="true" class=" pull-right fa fa-chevron-down md-toggle-icon"\n' +
      '  ng-class="{\'toggled\' : isOpen()}"></span>\n' +
      '</md-button>\n' +
      '<ul ng-show="isOpen()" id="docs-menu-{{section.name | nospace}}" class="menu-toggle-list">\n' +
      '  <li ng-repeat="page in section.pages">\n' +
      '    <menu-link section="page"></menu-link>\n' +
      '  </li>\n' +
      '</ul>\n' +
      '');
  }])
  .directive('menuToggle', ['$timeout', function ($timeout ) {
    return {
      scope: {
        section: '='
      },
      templateUrl: 'partials/menuToggle.html',
      link: function (scope, element) {
        // allows to get a handle of the parent controller
        var controller = element.parent().controller();

        scope.isOpen = function () {
          return controller.isOpen(scope.section);
        };
        scope.toggle = function () {
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