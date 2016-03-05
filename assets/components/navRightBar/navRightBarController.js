application.controller('navRightBarController', function($scope, $state, _, formService, acService, navRightBarService) {

    $scope.$state = $state;
    $scope.fs = formService;
    var service = navRightBarService;
    
    $scope.submit = function() {
        formService.submit($scope.fs.formData);
    };

    $scope.cancel = function() {
        formService.cancel($scope.fs.formData);
        navRightBarService.toggle();
    };

    $scope.delete = function(ev) {
        formService.delete(ev, $scope.fs.formData);
    };

    $scope.querySearch = function(searchText, url, output) {
        return acService.querySearch($scope.fs.formData, searchText, url, output);
    };
    
    $scope.changeValue = function(change) {
        acService.changeValue($scope.fs.formData, change);
    };
    
    $scope.changeState = function(link) {
        console.log("change state to " + link);
        $state.go(link);
    };
    
    $scope.isObject = function(value) {
        var modelAttr = $scope.fs.formData.model[value];
        return _.isObject(modelAttr);
    };
    
    $scope.getSelectLabel = function(name, path, defaultText) {
        return ($scope.fs.formData.model[name]) ? _.get($scope.fs.formData.model, path) : defaultText;
    };

    /* navRightBar related */
    // using ng-style to change its style
    $scope.style = changeStyle();

    function changeStyle() {
        if (!service.isLockedOpen) {
            return {
                "z-index": "60"
            };
        }
        // Otherwise, use z-index: 58 in navRightBar.css
    }
});