application.directive('inputClear', function() {

    var ESC_KEY_CODE = 27;

    return {
        restrict: 'A',
        compile: function(element, attrs) {
            var color = attrs.inputClear;
            var style = color ? "color:" + color + ";" : "";
            var action = attrs.ngModel + " = ''";
            element.after(
                '<md-button class="animate-show md-icon-button md-accent"' +
                'ng-show="' + attrs.ngModel + '" ng-click="' + action + '">' +
                '<div style="' + style + '">x</div>' +
                '</md-button>');

            element.bind('keyup', function(event) {
                if (event.keyCode === ESC_KEY_CODE) {
                    console.log("esc key pressed");
                }
            });
        }
    };
});