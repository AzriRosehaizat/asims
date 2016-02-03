application.directive('match', function() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=match"
        },
        link: function(scope, element, attributes, ngModel) {
             
            ngModel.$validators.match = function(modelValue) {
                return modelValue === scope.otherModelValue;
            };
 
            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
});